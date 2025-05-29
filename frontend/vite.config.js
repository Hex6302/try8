const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
