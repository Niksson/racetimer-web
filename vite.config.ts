/// <reference types="vitest/config" />
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [/tests/]
    },
    chunkSizeWarningLimit: 600
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'scramble-display'
        }
      }
    }),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true
      },

      manifest: {
        name: 'RaceTimer',
        display: 'standalone',
        short_name: 'RaceTimer',
        description: 'RaceTimer - Speedcubing timer to race with your friends',
        theme_color: '#15191e'
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module'
      }
    }),
    tailwindcss(),
  ],
  worker: {
    format: 'es'
  },
  optimizeDeps: {
    exclude: ['cubing']
  }
})
