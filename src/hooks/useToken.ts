import { useCallback, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import { message } from 'antd'

import configs from 'configs'
import { getTokenMetadata } from 'helpers/util'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs

/**
 * Get token metadata by symbol
 * @param symbol
 * @returns
 */
export const useMetadataBySymbol = (symbol: string) => {
  const mint = useMemo(
    () =>
      [...acceptedPayments, ...partneredTokens].find(
        ({ symbol: s }) => symbol === s,
      ),
    [symbol],
  )
  return mint
}

/**
 * Get token metadata by address
 * @param address
 * @returns
 */
export const useMetadataByAddress = (address: string) => {
  const mint = useMemo(
    () =>
      [...acceptedPayments, ...partneredTokens].find(
        ({ address: a }) => address === a,
      ),
    [address],
  )
  return mint
}

/**
 * Get token price
 * @param ticket
 * @returns
 */
export const usePrice = (ticket: string) => {
  const { data, error, mutate } = useSWR(ticket, getTokenMetadata)

  const price = data?.market_data?.current_price?.usd || 0
  const refresh = useCallback(() => mutate(), [mutate])

  useEffect(() => {
    if (error) message.error(error)
  }, [error])

  return { price, refresh }
}

/**
 * Get token price change in 24h
 * @param ticket
 * @returns
 */
export const use24hChange = (ticket: string) => {
  const { data, error, mutate } = useSWR(ticket, getTokenMetadata)

  const change = data?.market_data?.price_change_24h || 0
  const refresh = useCallback(() => mutate(), [mutate])

  useEffect(() => {
    if (error) message.error(error)
  }, [error])

  return { change, refresh }
}
