#!/usr/bin/env bash
set -e

# Get the absolute path of the frontend directory
FRONTEND_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$FRONTEND_DIR")"

# Change to root directory
cd "$ROOT_DIR"

# Install root dependencies
echo "Installing root dependencies..."
npm install --legacy-peer-deps

# Change to frontend directory
cd "$FRONTEND_DIR"

# Install frontend dependencies including Vite
echo "Installing frontend dependencies..."
npm install --legacy-peer-deps
npm install --save-dev vite @vitejs/plugin-react

# Build the project using local Vite installation
echo "Building project..."
npx vite build

# Verify the build output exists
if [ ! -d "dist" ]; then
    echo "Error: Build output directory 'dist' not found!"
    exit 1
fi

echo "Build completed successfully!" 