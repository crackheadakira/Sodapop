import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default {
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
  plugins: [
    vue({
      reactivityTransform: true,
    })
  ]
}

