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

# Clean install frontend dependencies
echo "Installing frontend dependencies..."
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Install Vite and React plugin globally
echo "Installing Vite globally..."
npm install -g vite@latest
npm install --save-dev vite@latest @vitejs/plugin-react@latest

# Build the project
echo "Building project..."
NODE_ENV=production ./node_modules/.bin/vite build

# Verify the build output exists
if [ ! -d "dist" ]; then
    echo "Error: Build output directory 'dist' not found!"
    exit 1
fi

echo "Build completed successfully!" 