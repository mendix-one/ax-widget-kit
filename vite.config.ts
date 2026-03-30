import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ax/shared': resolve(__dirname, 'packages/shared'),
      '@ax/widget-kit': resolve(__dirname, 'packages/ax-widget-kit'),
      '@ax/auth-page': resolve(__dirname, 'packages/ax-auth-page'),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dev.amoza.xyz'],
  },
})
