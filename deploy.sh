#!/bin/bash

# Build script for Katakana app
# This script handles the build process for deployment

echo "🏗️  Building Katakana App..."

# Ensure we have all dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Ensure output directory exists (if we were bundling)
# mkdir -p dist

# Verify assets exist
if [ ! -f "stroke-order.js" ]; then
    echo "❌ stroke-order.js missing! Generating..."
    node fetch-stroke-order.js
fi

if [ ! -f "favicon.png" ]; then
    echo "❌ favicon.png missing! Generating..."
    node generate-favicon.js
fi

if [ ! -f "og-image.png" ]; then
    echo "❌ og-image.png missing! Generating..."
    node generate-og-image.js
fi

echo "✅ Build complete! ready for deployment."
