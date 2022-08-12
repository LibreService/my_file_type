<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { NDataTable, NIcon, NInput, useDialog } from 'naive-ui'
import type { DataTableColumns, UploadFileInfo } from 'naive-ui'
import { DownloadFilled } from '@vicons/material'

declare let Files: UploadFileInfo[]
declare const Magic: {
  getType: (buf: Uint8Array, len: number) => string,
  getMIME: (buf: Uint8Array, len: number) => string,
  getExtension: (buf: Uint8Array, len: number) => string
}
type Row = {
  name: string,
  type: string,
  mime: string,
  extension: string,
  file: File
}
const headerLength = 1024 * 1024

const data = ref<Row[]>([])

const dialog = useDialog()

function createColumns (): DataTableColumns<Row> {
  return [
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'MIME', key: 'mime' },
    { title: 'Extension', key: 'extension' },
    {
      title: 'Download',
      key: 'download',
      render (row) {
        const name = ref(row.name)
        function download () {
          const url = URL.createObjectURL(row.file)
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
          style: 'cursor: pointer',
          size: 24,
          onClick: () => {
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
    const arrayBuffer = await fileInfo.file.slice(0, headerLength).arrayBuffer()
    const u8Array = new Uint8Array(arrayBuffer)
    data.value.push({
      name: fileInfo.name,
      type: Magic.getType(u8Array, u8Array.length),
      mime: Magic.getMIME(u8Array, u8Array.length),
      extension: Magic.getExtension(u8Array, u8Array.length),
      file: fileInfo.file
    })
  }
})
</script>

<template>
<n-data-table :columns="createColumns()" :data="data" class="my-column"/>
</template>
