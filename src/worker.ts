import { loadWasm, expose } from '@libreservice/my-worker'

const readyPromise = loadWasm('magic.js', {
  url: '__LIBRESERVICE_CDN__',
  init () {
    Module.ccall('init', 'null', [], [])
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
