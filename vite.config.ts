import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
    vue()
  ]
})
