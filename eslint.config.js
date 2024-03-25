import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist', 'node_modules'],
  typescript: true,
  vue: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'no-console': 'off',
    'antfu/if-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': ['warn', {
      multiline: 'never',
    }],
  },
})
