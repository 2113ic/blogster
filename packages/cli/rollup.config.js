import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'

export default defineConfig({
  input: './index.js',
  plugins: [json()],
  external: ['vite', 'commander'],
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: 'index.js',
  },
})
