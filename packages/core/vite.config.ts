import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './app.ts',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
})
