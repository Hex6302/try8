#!/usr/bin/env bash
set -e

# Enable debug output
set -x

# Get the absolute path of the frontend directory
FRONTEND_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$FRONTEND_DIR")"

echo "Current directory: $(pwd)"
echo "Frontend directory: $FRONTEND_DIR"
echo "Root directory: $ROOT_DIR"

# Change to frontend directory
cd "$FRONTEND_DIR"
echo "Changed to frontend directory: $(pwd)"

# Clean install frontend dependencies
echo "Installing frontend dependencies..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Install dependencies with legacy peer deps
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Install Vite and React plugin explicitly
echo "Installing Vite and dependencies..."
npm install --save-dev vite@latest @vitejs/plugin-react@latest

# Create a temporary package.json for the build
echo "Creating temporary build configuration..."
cat > vite.config.cjs << EOL
const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')
const path = require('path')

module.exports = defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: false,
    minify: true
  }
})
EOL

# Build the project using the local Vite installation
echo "Building project..."
NODE_ENV=production ./node_modules/.bin/vite build --config vite.config.cjs

# List contents of current directory
echo "Contents of current directory:"
ls -la

# List contents of dist directory if it exists
if [ -d "dist" ]; then
    echo "Contents of dist directory:"
    ls -la dist
else
    echo "dist directory not found!"
fi

# Clean up temporary files
rm vite.config.cjs

# Verify the build output exists
if [ ! -d "dist" ]; then
    echo "Error: Build output directory 'dist' not found!"
    exit 1
fi

echo "Build completed successfully!" 