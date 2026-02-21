# ============================================================
# Tigran Media - Deploy Script
# Usage: .\deploy.ps1
# ============================================================

$ErrorActionPreference = "Stop"

# In PowerShell 7+, avoid treating native command stderr as terminating errors.
# We still enforce failures via $LASTEXITCODE checks after each command.
if ($PSVersionTable.PSVersion.Major -ge 7) {
    $PSNativeCommandUseErrorActionPreference = $false
}

$BucketName = "tigranmedia.be"
$DistributionId = "EH9ROX11S3VT1"
$Region = "eu-west-1"
$ProjectDir = $PSScriptRoot

Set-Location $ProjectDir

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Tigran Media - Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ─────────────────────────────────────────────
# Step 1: Download latest CMS content from S3
# ─────────────────────────────────────────────
Write-Host "[1/5] Downloading latest CMS content from S3..." -ForegroundColor Yellow

$contentDir = Join-Path $ProjectDir "src\content"

# Download each content file (suppress errors if file doesn't exist yet)
$cmsPairs = @(
    @{ Remote = "cms-data/albums.json";       Local = "$contentDir\albums.json" },
    @{ Remote = "cms-data/photos.json";       Local = "$contentDir\photos.json" },
    @{ Remote = "cms-data/testimonials.json"; Local = "$contentDir\testimonials.json" },
    @{ Remote = "cms-data/faq.json";          Local = "$contentDir\faq.json" }
)

foreach ($pair in $cmsPairs) {
    try {
        aws s3 cp "s3://$BucketName/$($pair.Remote)" $pair.Local --region $Region 2>$null | Out-Null
        Write-Host "  + $($pair.Remote)" -ForegroundColor DarkGray
    } catch {
        Write-Host "  - $($pair.Remote) (not found, using local)" -ForegroundColor DarkGray
    }
}

# Sync blog posts
try {
    aws s3 sync "s3://$BucketName/cms-data/blog/" "$contentDir\blog\" --region $Region 2>$null | Out-Null
    Write-Host "  + cms-data/blog/" -ForegroundColor DarkGray
} catch {
    Write-Host "  - cms-data/blog/ (not found, using local)" -ForegroundColor DarkGray
}

Write-Host "  CMS content synced." -ForegroundColor Green

# ─────────────────────────────────────────────
# Step 2: Install dependencies
# ─────────────────────────────────────────────
Write-Host ""
Write-Host "[2/5] Installing dependencies..." -ForegroundColor Yellow

$ErrorActionPreference = "Continue"
cmd /c "npm ci --prefer-offline 2>&1" | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  npm ci failed, trying npm install..." -ForegroundColor DarkYellow
    cmd /c "npm install 2>&1" | Out-Null
}
$ErrorActionPreference = "Stop"
Write-Host "  Dependencies installed." -ForegroundColor Green

# ─────────────────────────────────────────────
# Step 3: Build the site
# ─────────────────────────────────────────────
Write-Host ""
Write-Host "[3/5] Building Next.js site..." -ForegroundColor Yellow

$ErrorActionPreference = "Continue"
cmd /c "npm run build 2>&1"
$buildExitCode = $LASTEXITCODE
$ErrorActionPreference = "Stop"
if ($buildExitCode -ne 0) {
    Write-Host ""
    Write-Host "  BUILD FAILED!" -ForegroundColor Red
    Write-Host "  Fix the errors above and try again." -ForegroundColor Red
    exit 1
}
Write-Host "  Build complete." -ForegroundColor Green

# ─────────────────────────────────────────────
# Step 4: Upload source for CodeBuild (CMS publish button)
# ─────────────────────────────────────────────
Write-Host ""
Write-Host "[4/5] Uploading source for CMS publish..." -ForegroundColor Yellow

$sourceZip = Join-Path $ProjectDir "codebuild-source.zip"
if (Test-Path $sourceZip) { Remove-Item $sourceZip -Force }

# Create temp directory with needed source files
$tempDir = Join-Path $env:TEMP "tigranmedia-source-$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copy files, excluding heavy / unnecessary directories
$excludeDirs = @('node_modules', '.next', 'out', 'terraform', '.git', 'fotos', 'codebuild-source.zip')
Get-ChildItem $ProjectDir -Force | Where-Object {
    $_.Name -notin $excludeDirs
} | ForEach-Object {
    Copy-Item $_.FullName -Destination (Join-Path $tempDir $_.Name) -Recurse -Force
}

Compress-Archive -Path "$tempDir\*" -DestinationPath $sourceZip -Force
Remove-Item $tempDir -Recurse -Force

aws s3 cp $sourceZip "s3://$BucketName/codebuild/source.zip" --region $Region | Out-Null
Remove-Item $sourceZip -Force

Write-Host "  Source uploaded (CMS publish ready)." -ForegroundColor Green

# ─────────────────────────────────────────────
# Step 5: Sync build output to S3
# ─────────────────────────────────────────────
Write-Host ""
Write-Host "[5/5] Syncing to S3 with optimized caching..." -ForegroundColor Yellow

# HTML, JSON, XML etc. → short cache (must-revalidate)
# Excludes _next/ (handled separately) and managed S3 directories
aws s3 sync "out/" "s3://$BucketName/" --region $Region --delete `
    --cache-control "public, max-age=0, must-revalidate" `
    --exclude "_next/*" `
    --exclude "cms-data/*" `
    --exclude "codebuild/*" `
    --exclude "uploads/*"

# _next/ hashed assets → long immutable cache (1 year)
aws s3 sync "out/_next/" "s3://$BucketName/_next/" --region $Region --delete `
    --cache-control "public, max-age=31536000, immutable"

Write-Host "  S3 sync complete." -ForegroundColor Green

# ─────────────────────────────────────────────
# Step 6: Invalidate CloudFront cache
# ─────────────────────────────────────────────
Write-Host ""
Write-Host "[6/6] Invalidating CloudFront cache..." -ForegroundColor Yellow

$invalidationJson = aws cloudfront create-invalidation `
    --distribution-id $DistributionId `
    --paths "/*" `
    --region $Region `
    --output json

$invalidation = $invalidationJson | ConvertFrom-Json
Write-Host "  Invalidation ID: $($invalidation.Invalidation.Id)" -ForegroundColor DarkGray

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Deploy Complete!" -ForegroundColor Green
Write-Host "  Site: https://tigranmedia.be" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
