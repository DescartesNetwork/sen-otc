import { useCallback, useEffect, useState } from 'react'

import { message } from 'antd'

import { getTokenMetadata } from 'helpers/util'

export const usePrice = (ticket: string) => {
  const [price, setPrice] = useState(0)

  const getPrice = useCallback(async () => {
    try {
      const {
        market_data: {
          current_price: { usd },
        },
      } = await getTokenMetadata(ticket)
      return setPrice(usd)
    } catch (er: any) {
      message.error(er.message)
      return setPrice(0)
    }
  }, [ticket])

  useEffect(() => {
    getPrice()
  }, [getPrice])

  return [price, getPrice] as [typeof price, typeof getPrice]
}
