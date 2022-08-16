import type { UploadFileInfo } from 'naive-ui'

declare global {
  const Magic: {
    readyPromise: Promise<any>,
    getType: (buf: Uint8Array, len: number) => string,
    getMIME: (buf: Uint8Array, len: number) => string,
    getExtension: (buf: Uint8Array, len: number) => string
  }
  let Files: UploadFileInfo[]
}
