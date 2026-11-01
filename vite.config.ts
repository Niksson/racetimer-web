/// <reference types="vitest/config" />
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig, type Plugin } from 'vite'
import { readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

const { version } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
) as { version: string }

// Prod build: cubing's worker URL resolution breaks after bundling; emit its worker entry as a proper Vite worker.
function cubingSearchWorker(): Plugin {
  const call = 'import.meta.resolve("./search-worker-entry.js")'
  return {
    name: 'cubing-search-worker',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0]
      if (!file.includes('/cubing/dist/') || !code.includes(call)) return null
      const entry = `${dirname(file)}/search-worker-entry.js?worker&url`
      return {
        code: `import __cubingWorkerUrl from ${JSON.stringify(entry)};\n${code.replace(call, '__cubingWorkerUrl')}`,
        map: null
      }
    }
  }
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
  build: {
    rollupOptions: {
      external: [/tests/]
    },
    chunkSizeWarningLimit: 600
  },
  plugins: [
    cubingSearchWorker(),
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
