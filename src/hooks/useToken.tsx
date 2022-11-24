import { useCallback, useEffect } from 'react'
import useSWR from 'swr'

import { message } from 'antd'

import { getTokenMetadata } from 'helpers/util'

export const usePrice = (ticket: string) => {
  const { data, error, mutate } = useSWR(ticket, getTokenMetadata)
  const price = data?.market_data?.current_price?.usd || 0
  const refresh = useCallback(() => {
    return mutate(ticket)
  }, [mutate, ticket])
  useEffect(() => {
    if (error) message.error(error)
  }, [error])
  return [price, refresh] as [typeof price, typeof refresh]
}

export const use24hChange = (ticket: string) => {
  const { data, error, mutate } = useSWR(ticket, getTokenMetadata)
  const change = data?.market_data?.price_change_24h || 0
  const refresh = useCallback(() => {
    return mutate(ticket)
  }, [mutate, ticket])
  useEffect(() => {
    if (error) message.error(error)
  }, [error])
  return [change, refresh] as [typeof change, typeof refresh]
}
