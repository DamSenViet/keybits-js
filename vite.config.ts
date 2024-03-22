/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { resolve } from 'path'
import dtsPlugin from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      name: 'keybits',
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      // the proper extensions will be added
      fileName: 'keybits',
      formats: ['es', 'umd'],
    },
    sourcemap: 'inline',
  },
  plugins: [dtsPlugin()],
})
