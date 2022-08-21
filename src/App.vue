<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NDialogProvider, NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NH1, darkTheme, useOsTheme } from 'naive-ui'
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import MyPwa from './components/MyPwa.vue'
import './main.css'

const osThemeRef = useOsTheme()
const router = useRouter()

function gotoMainView () {
  router.push({ name: 'Main' })
}
</script>

<template>
<my-pwa />
<n-config-provider :theme="osThemeRef === 'dark' ? darkTheme : null">
<n-dialog-provider>
<n-layout-header bordered style="height: 56px; display: flex; align-items: center; justify-content: space-between">
  <my-header />
</n-layout-header>
<n-layout
    position="absolute"
    :native-scrollbar="false"
    style="top: 56px"
    content-style="height: 100%; display: flex; flex-direction: column"
  >
  <n-layout-content style="flex: 1 0 auto">
    <div style="cursor: pointer; text-align: center; margin-top: 16px" @click="gotoMainView">
      <n-h1>My File Type</n-h1>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive include="MainView">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </n-layout-content>
  <n-layout-footer
    style="flex-shrink: 0; margin-top: 16px"
  >
    <my-footer />
  </n-layout-footer>
</n-layout>
</n-dialog-provider>
</n-config-provider>
</template>
