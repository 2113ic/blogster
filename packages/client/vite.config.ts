import { resolve } from 'node:path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    Icons(),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['twemoji'],
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@et': resolve(__dirname, 'src/styles/element-plus'),
      '@icons': resolve(__dirname, 'src/components/icons')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          `@use '@/styles/utils' as *;`,
      },
    },
  },
  optimizeDeps: {
    include: [
      '@vueuse/core',
      'element-plus/es',
      'element-plus/es/components/**/style/css',
    ],
  },
})
