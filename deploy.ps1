# ============================================================
# Tigran Media - Deploy Script
# Bouwt de site en pusht naar S3 + CloudFront.
# Raakt geen CMS data, uploads of CodeBuild bestanden aan.
# Usage: .\deploy.ps1
# ============================================================

$ErrorActionPreference = "Stop"
if ($PSVersionTable.PSVersion.Major -ge 7) {
    $PSNativeCommandUseErrorActionPreference = $false
}

$BucketName     = "tigranmedia.be"
$DistributionId = "EH9ROX11S3VT1"
$Region         = "eu-west-1"
$ProjectDir     = $PSScriptRoot

Set-Location $ProjectDir

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Tigran Media - Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ─────────────────────────────────────────────
# Stap 1: Build
# ─────────────────────────────────────────────
Write-Host "[1/3] Bouwen..." -ForegroundColor Yellow

$ErrorActionPreference = "Continue"
cmd /c "npx next build 2>&1"
$buildExitCode = $LASTEXITCODE
$ErrorActionPreference = "Stop"

if ($buildExitCode -ne 0) {
    Write-Host ""
    Write-Host "  BUILD MISLUKT! Bekijk de fouten hierboven." -ForegroundColor Red
    exit 1
}
Write-Host "  Build geslaagd." -ForegroundColor Green

# ─────────────────────────────────────────────
# Stap 2: Sync naar S3
# ─────────────────────────────────────────────
Write-Host ""
Write-Host "[2/3] Uploaden naar S3..." -ForegroundColor Yellow

# HTML, JSON, XML, etc. → korte cache
aws s3 sync "out/" "s3://$BucketName/" --region $Region --delete `
    --cache-control "public, max-age=0, must-revalidate" `
    --exclude "_next/*" `
    --exclude "cms-data/*" `
    --exclude "codebuild/*" `
    --exclude "uploads/*" `
    --exclude "preview/*" `
    --exclude "backup/*"

if ($LASTEXITCODE -ne 0) {
    Write-Host "  S3 sync mislukt!" -ForegroundColor Red
    exit 1
}

# _next/ hashed assets → immutable lange cache
aws s3 sync "out/_next/" "s3://$BucketName/_next/" --region $Region --delete `
    --cache-control "public, max-age=31536000, immutable"

if ($LASTEXITCODE -ne 0) {
    Write-Host "  S3 _next sync mislukt!" -ForegroundColor Red
    exit 1
}

Write-Host "  Geupload naar S3." -ForegroundColor Green

# ─────────────────────────────────────────────
# Stap 3: CloudFront cache legen
# ─────────────────────────────────────────────
Write-Host ""
Write-Host "[3/3] CloudFront cache legen..." -ForegroundColor Yellow

$invalidationJson = aws cloudfront create-invalidation `
    --distribution-id $DistributionId `
    --paths "/*" `
    --region $Region `
    --output json

$invalidation = $invalidationJson | ConvertFrom-Json
Write-Host "  Invalidation ID: $($invalidation.Invalidation.Id)" -ForegroundColor DarkGray
Write-Host "  Cache geleegd." -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Deploy Klaar!" -ForegroundColor Green
Write-Host "  https://tigranmedia.be" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
