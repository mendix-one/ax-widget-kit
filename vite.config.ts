import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ax/shared': resolve(__dirname, 'packages/ax-shared/src'),
      '@ax/auth-layout': resolve(__dirname, 'packages/ax-auth-layout'),
      '@ax/signin-form': resolve(__dirname, 'packages/ax-signin-form'),
      '@ax/signup-form': resolve(__dirname, 'packages/ax-signup-form'),
      '@ax/resetpsw-form': resolve(__dirname, 'packages/ax-resetpsw-form'),
      '@ax/setpsw-form': resolve(__dirname, 'packages/ax-setpsw-form'),
      '@ax/web-app': resolve(__dirname, 'packages/ax-web-app'),
      '@ax/logo': resolve(__dirname, 'packages/ax-logo'),
      '@ax/tasks-menu': resolve(__dirname, 'packages/ax-tasks-menu'),
      '@ax/notify-menu': resolve(__dirname, 'packages/ax-notify-menu'),
      '@ax/user-menu': resolve(__dirname, 'packages/ax-user-menu'),
      '@ax/sidebar': resolve(__dirname, 'packages/ax-sidebar'),
      '@ax/agent-chat': resolve(__dirname, 'packages/ax-agent-chat'),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dev.amoza.xyz'],
  },
})
