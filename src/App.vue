<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NDialogProvider, NConfigProvider, NH1, darkTheme, useOsTheme } from 'naive-ui'
import { MyLayout, MyHeader } from '@libreservice/my-widget'
import MyFooter from './components/MyFooter.vue'
import MyPwa from './components/MyPwa.vue'
import { homepage } from '../package.json'
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
<my-layout>
  <template #header>
    <my-header icon="/LibreService.svg" :homepage="homepage" />
  </template>
  <template #content>
    <div style="cursor: pointer; text-align: center; margin-top: 16px" @click="gotoMainView">
      <n-h1>My File Type</n-h1>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive include="MainView">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </template>
  <template #footer>
    <my-footer />
  </template>
</my-layout>
</n-dialog-provider>
</n-config-provider>
</template>
