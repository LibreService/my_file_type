import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    replace({
      __COMMIT__: execSync('git rev-parse HEAD').toString().trim(),
      __BUILD_DATE__: new Date().toLocaleString()
    }),
    vue()
  ]
})
