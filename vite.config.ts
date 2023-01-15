import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import { run } from 'vite-plugin-run'

const resources = ['group1-shard1of1.bin', 'magic.data', 'magic.js', 'magic.wasm']

const workbox: VitePWAOptions["workbox"] = {
  maximumFileSizeToCacheInBytes: 10000000,
  globPatterns: [
    '**/*.{js,css,html}',
    'apple-touch-icon.png',
    ...resources
  ]
}

if (process.env.LIBRESERVICE_CDN) {
  workbox.manifestTransforms = [
    manifest => ({
      manifest: manifest.map(entry => resources.includes(entry.url) ? {
        url: process.env.LIBRESERVICE_CDN + entry.url,
        revision: entry.revision,
        size: entry.size
      } : entry),
      warnings: []
    })
  ]
}

const plugins = [
  replace({
    __LIBRESERVICE_CDN__: process.env.LIBRESERVICE_CDN || '',
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
    workbox,
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

if (process.env.NODE_ENV !== 'production') {
  plugins.push(run([
    {
      name: 'Transpile worker',
      run: ['pnpm run worker'],
      condition: file => file.includes('worker.ts')
    }
  ]))
}

export default defineConfig({
  plugins
})
