<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { NDataTable, NIcon, NInput, NModal, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { Eye } from '@vicons/fa'
import { DownloadFilled } from '@vicons/material'
import MyPreviewText from '../components/MyPreviewText.vue'

type Row = {
  name: string,
  type: string,
  mime: string,
  extension: string,
  preview: boolean,
  file: File
}

const headerLength = 1024 * 1024

const data = ref<Row[]>([])

const dialog = useDialog()

const showPreviewText = ref(false)
const previewCode = ref('')

function createColumns (): DataTableColumns<Row> {
  const iconStyle = 'cursor: pointer'
  const iconSize = 24
  return [
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'MIME', key: 'mime' },
    { title: 'Extension', key: 'extension' },
    {
      title: 'Preview',
      key: 'preview',
      render (row) {
        if (!row.preview) {
          return undefined
        }
        return h(NIcon, {
          component: Eye,
          style: iconStyle,
          size: iconSize,
          async onClick () {
            previewCode.value = await row.file.text()
            showPreviewText.value = true
          }
        })
      }
    },
    {
      title: 'Download',
      key: 'download',
      render (row) {
        const name = ref(row.name)
        function download () {
          // Disable iOS Safari auto appending extension
          const newFile = row.file.slice(0, row.file.size, 'application/octet-stream')
          const url = URL.createObjectURL(newFile)
          const a = document.createElement('a')
          a.href = url
          a.download = name.value
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
        return h(NIcon, {
          component: DownloadFilled,
          style: iconStyle,
          size: iconSize,
          onClick () {
            const dialogInstance = dialog.info({
              title: 'Set file name',
              content: () => h(NInput, {
                clearable: true,
                value: name.value,
                onKeyup: e => {
                  if (e.key === 'Enter') {
                    download()
                    dialogInstance.destroy()
                  }
                },
                'onUpdate:value': newValue => { name.value = newValue }
              }),
              positiveText: 'Download',
              onPositiveClick: download
            })
          }
        })
      }
    }
  ]
}

onMounted(async () => {
  for (const fileInfo of Files) {
    const arrayBuffer = await fileInfo.file!.slice(0, headerLength).arrayBuffer()
    const u8Array = new Uint8Array(arrayBuffer)
    const mime = Magic.getMIME(u8Array, u8Array.length)
    data.value.push({
      name: fileInfo.name,
      type: Magic.getType(u8Array, u8Array.length),
      mime,
      preview: mime.endsWith('ascii') || mime.endsWith('utf-8'),
      extension: Magic.getExtension(u8Array, u8Array.length),
      file: fileInfo.file!
    })
  }
})
</script>

<template>
<n-data-table :columns="createColumns()" :data="data" class="my-column"/>
<n-modal v-model:show="showPreviewText" style="max-width: calc(100vw - 32px)">
  <my-preview-text v-if="showPreviewText" :code="previewCode" :predictedLanguage="'Plain Text'" />
</n-modal>
</template>
