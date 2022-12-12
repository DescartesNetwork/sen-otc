import storage from 'helpers/storage'

/**
 * Network
 */
const getNetwork = () => {
  switch (storage.get('network')) {
    case 'devnet':
      return 'devnet'
    case 'testnet':
      return 'testnet'
    case 'mainnet':
      return 'mainnet'
    default:
      return 'mainnet'
  }
}
export type Net = 'devnet' | 'testnet' | 'mainnet'
export const net: Net = getNetwork()

export const switchNetwork = (value: Net) => {
  storage.set('network', value)
  const { origin, pathname, search } = window.location
  const params = new URLSearchParams(search)
  params.delete('network')
  console.log(origin, pathname, params.toString())
  if (!params.toString()) window.location.href = `${origin}${pathname}`
  else window.location.href = `${origin}${pathname}?${params.toString()}`
}

/**
 * Chain ID
 */
const getChainId = () => {
  switch (net) {
    case 'devnet':
      return 103
    case 'testnet':
      return 102
    case 'mainnet':
      return 101
    default:
      return 101
  }
}
export type ChainId = 101 | 102 | 103
export const chainId: ChainId = getChainId()

/**
 * RPC Node
 */
const getRpc = () => {
  switch (net) {
    case 'devnet':
      return 'https://api.devnet.solana.com'
    case 'testnet':
      return 'https://api.testnet.solana.com'
    case 'mainnet':
      return 'https://solitary-autumn-water.solana-mainnet.quiknode.pro/dcbac9d444818a20ac583541dec35b44c6840888'
    default:
      return 'https://solitary-autumn-water.solana-mainnet.quiknode.pro/dcbac9d444818a20ac583541dec35b44c6840888'
  }
}
export const rpc: string = getRpc()
