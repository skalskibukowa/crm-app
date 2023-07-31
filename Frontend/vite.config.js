import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand for simple case
      '/foo': 'http://localhost:4534',
      // with options if you need to use change origin
      '/api/v1': {
        target: 'http://localhost:8081/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // with RegEx for path matching
      '^/fallback/.*': {
        target: 'http://someapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      },
      // Using the proxy instance
      '/api': {
        target: 'http://someapi.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy' so you can do whatever you want here
        }
      },
      // Proxying websockets or socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true
      }
    }
  }
})
