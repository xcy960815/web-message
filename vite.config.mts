import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WebMessage',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format: string) => {
        if (format === 'es') return 'web-message.es.js'
        if (format === 'cjs') return 'web-message.common.js'
        return 'web-message.umd.js'
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'web-message.css'
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
