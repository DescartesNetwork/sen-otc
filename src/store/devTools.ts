import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

// Bugfix performance
// https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Troubleshooting.md#excessive-use-of-memory-and-cpu
export const devTools = (appName: string): any => {
  if (process.env.NODE_ENV !== 'development') return false
  return {
    name: appName,
    actionSanitizer: ({ payload, type }: { payload: any; type: string }) => ({
      payload,
      type,
    }),
  }
}

// BigInt Serialization Middleware
// https://redux-toolkit.js.org/api/serializabilityMiddleware
const isPlain = (val: any): boolean => {
  const isPlainObject = (obj: object): boolean => {
    if (obj === null) return false
    const proto = Object.getPrototypeOf(obj)
    return proto !== null && Object.getPrototypeOf(proto) === null
  }
  return (
    typeof val === 'undefined' ||
    val === null ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val) ||
    isPlainObject(val) ||
    typeof val === 'bigint' ||
    val instanceof PublicKey ||
    val instanceof BN ||
    Buffer.isBuffer(val)
  )
}

export const serializationMiddleware = {
  serializableCheck: {
    isSerializable: isPlain,
  },
}
