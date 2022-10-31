import type { UploadFileInfo } from 'naive-ui'

declare global {
  const Module: {
    onRuntimeInitialized: () => void
    ccall: (name: string, returnType: string, argsType: string[], args: any[]) => any
  }
  let Files: UploadFileInfo[]
}
