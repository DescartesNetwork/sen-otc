import axios from 'axios'
import numbro from 'numbro'

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

export const getTokenMetadata = async (ticket: string) => {
  if (!ticket) throw new Error('Invalid token ticket')
  const { data } = await axios.get(
    'https://api.coingecko.com/api/v3/coins/' + ticket,
  )
  return data
}
