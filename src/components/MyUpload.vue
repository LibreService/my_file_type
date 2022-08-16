<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NButton, NUpload, NUploadDragger, NIcon, NText, NP, NSpace } from 'naive-ui'
import { AttachFileFilled } from '@vicons/material'
import type { UploadFileInfo } from 'naive-ui'

const router = useRouter()
const wasmLoaded = ref(false)
const files = ref<UploadFileInfo[]>([])

function handleUpdate (fileList: UploadFileInfo[]) {
  files.value = fileList
}

function clearAll () {
  files.value.splice(0, files.value.length)
}

function check () {
  Files = files.value
  router.push({ name: 'Result' })
}

const checkable = computed(() => wasmLoaded.value && files.value.length > 0)

onMounted(async () => {
  await Magic.readyPromise
  wasmLoaded.value = true
})
</script>

<template>
<n-card class="my-column">
  <n-upload multiple directory-dnd :default-upload="false" @update:file-list="handleUpdate">
    <n-upload-dragger>
      <div style="margin-bottom: 16px">
        <n-icon :size="32">
          <attach-file-filled />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">Click, or drag files/folders to this area</n-text>
      <n-p>Checking is performed locally in browser. Your files won't be uploaded.</n-p>
    </n-upload-dragger>
  </n-upload>
  <template #action>
    <n-space justify="end">
      <n-button secondary type="error" :disabled="files.length === 0" @click="clearAll">Clear all</n-button>
      <n-button secondary type="info" :disabled="!checkable" @click="check">Check</n-button>
    </n-space>
  </template>
</n-card>
</template>
