<script setup lang="ts">
import { h, ref, watchEffect } from 'vue'
import { NDataTable, NIcon, NInput, NModal, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { ModelOperations } from '@vscode/vscode-languagedetection'
import model from '@vscode/vscode-languagedetection/model/model.json'
import { Eye } from '@vicons/fa'
import { DownloadFilled } from '@vicons/material'
import MyPreviewText from '../components/MyPreviewText.vue'
import { langMap } from '../lang'
import { RentedBuffer } from '@libreservice/my-worker'
import { getType, getMIME, getExtension } from '../workerAPI'
import { submittedFiles } from '../manager'

type Row = {
  name: string,
  type: string,
  mime: string,
  extension: string,
  preview: boolean,
  file: File
}

const headerLength = 1024 * 1024
const guessThreshold = 0.4
const previewLength = 200 * 1024 // round up 120 * 1000

const data = ref<Row[]>([])

const dialog = useDialog()

const showPreviewText = ref(false)
const previewCode = ref('')
const predictedExtension = ref('')
const detector = new ModelOperations({
  modelJsonLoaderFunc: () => Promise.resolve(model),
  weightsLoaderFunc: async () => await (await fetch('__LIBRESERVICE_CDN__' + 'group1-shard1of1.bin')).arrayBuffer()
})

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
            previewCode.value = await row.file.slice(0, previewLength).text()
            predictedExtension.value = row.extension
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

watchEffect(async () => {
  data.value = []
  for (const fileInfo of submittedFiles.value) {
    const arrayBuffer = await fileInfo.file!.slice(0, headerLength).arrayBuffer()
    const rBuf = new RentedBuffer(arrayBuffer)
    let guessLangExtension: string | undefined
    let type: string
    let extension: string
    let mime = await getMIME(rBuf)
    const isText = mime.endsWith('ascii') || mime.endsWith('utf-8')
    if (isText) {
      const result = await detector.runModel(await fileInfo.file!.text())
      if (result.length > 0) {
        const { languageId, confidence } = result[0]
        if (confidence > guessThreshold) {
          guessLangExtension = languageId === 'prolog' ? 'pro' : languageId
        }
      }
    }
    if (guessLangExtension) {
      const lang = langMap[guessLangExtension]
      type = `${lang.name} source`
      mime = mime.replace(/.*;/, (lang.mime || 'text/plain') + ';')
      extension = guessLangExtension
    } else {
      type = await getType(rBuf)
      extension = await getExtension(rBuf)
    }
    data.value.push({
      name: fileInfo.name,
      type,
      mime,
      preview: isText,
      extension,
      file: fileInfo.file!
    })
  }
})
</script>

<template>
  <n-data-table
    :columns="createColumns()"
    :data="data"
    class="my-column"
  />
  <n-modal
    v-model:show="showPreviewText"
    style="max-width: calc(100vw - 32px)"
  >
    <my-preview-text
      v-if="showPreviewText"
      :code="previewCode"
      :predicted-extension="predictedExtension"
    />
  </n-modal>
</template>
