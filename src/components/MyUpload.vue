<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NButton, NUpload, NUploadDragger, NIcon, NText, NP, NSpace } from 'naive-ui'
import { AttachFileFilled } from '@vicons/material'
import { files, submittedFiles } from '../manager'

const router = useRouter()

function clearAll () {
  files.value = []
}

function check () {
  submittedFiles.value = files.value
  router.push({ name: 'Result' })
}

const checkable = computed(() => files.value.length > 0)
</script>

<template>
  <n-card class="my-column">
    <n-upload
      v-model:file-list="files"
      multiple
      directory-dnd
      :default-upload="false"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 16px">
          <n-icon :size="32">
            <attach-file-filled />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          Click, or drag files/folders to this area
        </n-text>
        <n-p>Checking is performed locally in browser. Your files won't be uploaded.</n-p>
      </n-upload-dragger>
    </n-upload>
    <template #action>
      <n-space justify="end">
        <n-button
          secondary
          type="error"
          :disabled="files.length === 0"
          @click="clearAll"
        >
          Clear all
        </n-button>
        <n-button
          secondary
          type="info"
          :disabled="!checkable"
          @click="check"
        >
          Check
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>
