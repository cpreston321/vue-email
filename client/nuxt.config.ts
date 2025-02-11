import { resolve } from 'node:path'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  alias: {
    'vue-email': resolve(__dirname, '../src/index.ts'),
    'vue-email/nuxt': resolve(__dirname, '../src/nuxt.mjs'),
  },
  modules: ['@nuxt/devtools-ui-kit', '@nuxthq/ui', 'vue-email/nuxt'],
  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },
  app: {
    baseURL: '/__vue_email__/client',
  },
  vite: {
    // fixes shiki bug
    define: {
      'process.env.VSCODE_TEXTMATE_DEBUG': 'false',
    },
    build: {
      target: 'esnext',
    },
  },
  ui: {
    global: true,
    icons: ['heroicons', 'ph'],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
})
