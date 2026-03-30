import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ax/shared': resolve(__dirname, 'packages/ax-shared'),
      '@ax/auth-layout': resolve(__dirname, 'packages/ax-auth-layout'),
      '@ax/signin-form': resolve(__dirname, 'packages/ax-signin-form'),
      '@ax/signup-form': resolve(__dirname, 'packages/ax-signup-form'),
      '@ax/resetpsw-form': resolve(__dirname, 'packages/ax-resetpsw-form'),
      '@ax/setpsw-form': resolve(__dirname, 'packages/ax-setpsw-form'),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dev.amoza.xyz'],
  },
})
