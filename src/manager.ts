import { UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'

const files = ref<UploadFileInfo[]>([])
const submittedFiles = ref<UploadFileInfo[]>([])

export { files, submittedFiles }
