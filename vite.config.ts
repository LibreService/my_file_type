import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    replace({
      __COMMIT__: execSync('git rev-parse HEAD').toString().trim(),
      __BUILD_DATE__: new Date().toLocaleString()
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@vscode/vscode-languagedetection/model/group1-shard1of1.bin',
          dest: ''
        }
      ]
    }),
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 10000000,
        globPatterns: [
          '**/*.{js,css,html}',
          'apple-touch-icon.png',
          'group1-shard1of1.bin',
          'magic.data',
          'magic.wasm'
        ]
      },
      manifest: {
        name: 'My File Type',
        short_name: 'My File Type',
        icons: [
          {
            src: 'LibreService.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          }
        ]
      }
    })
  ]
})
