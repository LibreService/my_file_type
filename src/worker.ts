import { expose } from '@libreservice/my-worker'

importScripts('/magic.js')

const readyPromise = new Promise(resolve => {
  Module.onRuntimeInitialized = () => {
    Module.ccall('init', 'null', [], [])
    resolve(null)
  }
})

expose({
  getType (arrayBuffer: ArrayBuffer): string {
    return Module.ccall('get_type', 'string', ['array', 'number'], [new Uint8Array(arrayBuffer), arrayBuffer.byteLength])
  },
  getMIME (arrayBuffer: ArrayBuffer): string {
    return Module.ccall('get_mime', 'string', ['array', 'number'], [new Uint8Array(arrayBuffer), arrayBuffer.byteLength])
  },
  getExtension (arrayBuffer: ArrayBuffer): string {
    return Module.ccall('get_extension', 'string', ['array', 'number'], [new Uint8Array(arrayBuffer), arrayBuffer.byteLength])
  }
}, readyPromise)
