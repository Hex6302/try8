#!/usr/bin/env bash
set -e

# Ensure we're in the frontend directory
cd "$(dirname "$0")"

# Install dependencies including Vite
echo "Installing dependencies..."
npm install
npm install --save-dev vite @vitejs/plugin-react

# Build the project
echo "Building project..."
npm run build

# Verify the build output exists
if [ ! -d "dist" ]; then
    echo "Error: Build output directory 'dist' not found!"
    exit 1
fi

echo "Build completed successfully!" 