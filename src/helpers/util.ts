import { isAddress } from '@sentre/otc'
import axios from 'axios'
import numbro from 'numbro'
import BN from 'bn.js'

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

/**
 * Undecimalize
 * @param amount
 * @param decimals
 * @returns
 */
export const undecimalize = (amount: BN, decimals: number): number => {
  const e = new BN(10 ** decimals)
  const natural = amount.div(e).toString()
  const residue = amount.sub(amount.div(e).mul(e)).toString()
  return parseFloat(`${natural}.${residue}`)
}

/**
 * Decimalize
 * @param amount
 * @param decimals
 * @returns
 */
export const decimalize = (amount: number, decimals: number): BN => {
  const e = new BN(10 ** decimals)
  let [natural, residue] = amount.toString().split('.')
  residue = residue || ''
  while (residue.length < decimals) residue = residue + '0'
  return new BN(natural).mul(e).add(new BN(residue.substring(0, decimals)))
}
