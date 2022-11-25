import { isAddress } from '@sentre/otc'
import axios from 'axios'
import numbro from 'numbro'

import { net } from 'configs/net'

/**
 * Delay by async/await
 * @param ms - milisenconds
 * @returns
 */
export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Wrapped Numbro - https://numbrojs.com/old-format.html
 * @param value - value
 * @returns
 */
export const numeric = (
  value?: number | string | bigint,
): ReturnType<typeof numbro> => {
  if (!value) return numbro('0')
  return numbro(value)
}

/**
 * Get token metadata from CoinGecko
 * @param ticket
 * @returns
 */
export const getTokenMetadata = async (ticket: string) => {
  if (!ticket) throw new Error('Invalid token ticket')
  const { data } = await axios.get(
    'https://api.coingecko.com/api/v3/coins/' + ticket,
  )
  return data
}

/**
 * Build a explorer url by context including addresses or transaction ids
 * @param addressOrTxId - Address or TxId
 * @returns
 */
export const explorer = (addressOrTxId: string): string => {
  if (isAddress(addressOrTxId)) {
    return `https://solscan.io/account/${addressOrTxId}?cluster=${net}`
  }
  return `https://solscan.io/tx/${addressOrTxId}?cluster=${net}`
}
