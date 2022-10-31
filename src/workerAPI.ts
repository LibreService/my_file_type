import { LambdaWorker } from '@libreservice/my-worker'

const worker = new LambdaWorker('/worker.js')

const getType: (arrayBuffer: ArrayBuffer) => Promise<string> = worker.register('getType')
const getMIME: (arrayBuffer: ArrayBuffer) => Promise<string> = worker.register('getMIME')
const getExtension: (arrayBuffer: ArrayBuffer) => Promise<string> = worker.register('getExtension')

export { getType, getMIME, getExtension }
