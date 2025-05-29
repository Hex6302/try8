#!/usr/bin/env bash
set -e

# Get the absolute path of the frontend directory
FRONTEND_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$FRONTEND_DIR")"

# Change to frontend directory
cd "$FRONTEND_DIR"

# Clean install frontend dependencies
echo "Installing frontend dependencies..."
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Install Vite and React plugin explicitly
echo "Installing Vite and dependencies..."
npm install --save-dev vite@latest @vitejs/plugin-react@latest

# Create a temporary package.json for the build
echo "Creating temporary build configuration..."
cat > vite.config.cjs << EOL
const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

module.exports = defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true
  }
})
EOL

# Build the project using the local Vite installation
echo "Building project..."
NODE_ENV=production npx vite build --config vite.config.cjs

# Clean up temporary files
rm vite.config.cjs

# Verify the build output exists
if [ ! -d "dist" ]; then
    echo "Error: Build output directory 'dist' not found!"
    exit 1
fi

echo "Build completed successfully!" 