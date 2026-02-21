#!/bin/bash
# ============================================================
# Tigran Media - Deploy Script (Mac/Linux)
# Bouwt de site en pusht naar S3 + CloudFront.
# Raakt geen CMS data, uploads of CodeBuild bestanden aan.
# Usage: bash deploy.sh
# ============================================================

set -e  # stop bij eerste fout

BUCKET_NAME="tigranmedia.be"
DISTRIBUTION_ID="EH9ROX11S3VT1"
REGION="eu-west-1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

echo ""
echo "========================================"
echo "  Tigran Media - Deploy Script"
echo "========================================"
echo ""

# ─────────────────────────────────────────────
# Stap 1: Build
# ─────────────────────────────────────────────
echo "[1/3] Bouwen..."

if ! npx next build; then
    echo ""
    echo "  BUILD MISLUKT! Bekijk de fouten hierboven."
    exit 1
fi

echo "  Build geslaagd."

# ─────────────────────────────────────────────
# Stap 2: Sync naar S3
# ─────────────────────────────────────────────
echo ""
echo "[2/3] Uploaden naar S3..."

# HTML, JSON, XML, etc. → korte cache
aws s3 sync "out/" "s3://$BUCKET_NAME/" \
    --region "$REGION" \
    --delete \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "_next/*" \
    --exclude "cms-data/*" \
    --exclude "codebuild/*" \
    --exclude "uploads/*" \
    --exclude "preview/*" \
    --exclude "backup/*"

# _next/ hashed assets → immutable lange cache
aws s3 sync "out/_next/" "s3://$BUCKET_NAME/_next/" \
    --region "$REGION" \
    --delete \
    --cache-control "public, max-age=31536000, immutable"

echo "  Geupload naar S3."

# ─────────────────────────────────────────────
# Stap 3: CloudFront cache legen
# ─────────────────────────────────────────────
echo ""
echo "[3/3] CloudFront cache legen..."

INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --region "$REGION" \
    --query "Invalidation.Id" \
    --output text)

echo "  Invalidation ID: $INVALIDATION_ID"
echo "  Cache geleegd."

echo ""
echo "========================================"
echo "  Deploy Klaar!"
echo "  https://tigranmedia.be"
echo "========================================"
echo ""
