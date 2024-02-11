import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { pluginImageCompress } from '@rsbuild/plugin-image-compress'

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr(), pluginImageCompress()],
  html: {
    title: 'Soo Mooc',
  },
  dev: {
    assetPrefix: 'auto',
  },
  output: {
    assetPrefix: 'auto',
    polyfill: 'usage',
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-module',
      override: {
        chunks: 'all',
        minSize: 50000,
      },
    },
  },
  source: {
    alias: {
      '@': './src',
    },
  },
})
