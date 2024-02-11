import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr()],
  html: {
    title: 'Soo Mooc',
  },
  dev: {
    assetPrefix: 'auto',
  },
  output: {
    assetPrefix: 'auto',
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-size',
      minSize: 30000,
    },
  },
  source: {
    alias: {
      '@': './src',
    },
  },
})
