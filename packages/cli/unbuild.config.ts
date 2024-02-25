import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./index'],
  externals: ['commader'],
  clean: true,
  rollup: {
    esbuild: {
      target: 'node18',
      minify: true,
    },
  },
})
