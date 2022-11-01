import { LambdaWorker, RentedBuffer } from '@libreservice/my-worker'

const worker = new LambdaWorker('/worker.js')

const getType: (arrayBuffer: RentedBuffer) => Promise<string> = worker.register('getType')
const getMIME: (arrayBuffer: RentedBuffer) => Promise<string> = worker.register('getMIME')
const getExtension: (arrayBuffer: RentedBuffer) => Promise<string> = worker.register('getExtension')

export { getType, getMIME, getExtension }
