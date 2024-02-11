import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import variantGroup from '@unocss/transformer-variant-group'
import harmonyPalette from '@evilmartians/harmony/tailwind'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [variantGroup()],
  theme: { colors: harmonyPalette },
  content: {
    pipeline: {
      include: [
        './index.html',
        './uno.config.ts',
        './src/**/*.vue',
      ],
    },
  },
  shortcuts: [
    // Components
    {
      'x-btn': `px2 py-6px rd`,
      'x-input': `block w-full px2 line-height-7 box-border 
        bg-slate-100 dark:bg-slate-800 b-0 rd
      `
    },
  ],
})
