import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { AppState } from 'app/model'
import { ALL, FilterOrderSet, ORDER_STATE_DIGIT } from 'app/constant'

export const useFilterOrders = (props: FilterOrderSet) => {
  const { coin, status, time } = props
  const { orders, retailers } = useSelector((state: AppState) => state)
  const [orderListAddress, setOrderListAddress] = useState<string[]>([])

  const filterOrder = useCallback(
    (address: string) => {
      const { retailer, state, created_at } = orders[address]
      const { mint_ask, mint_bid } = retailers[retailer]

      const coinCheck =
        coin && coin !== ALL ? [mint_ask, mint_bid].includes(coin) : true
      const statusCheck =
        status && status !== ALL ? ORDER_STATE_DIGIT[state] === status : true
      const timeCheck = time
        ? Date.now() / 1000 - Number(utils.undecimalize(created_at, 0)) <
          time * 86400
        : true
      return statusCheck && timeCheck && coinCheck
    },
    [coin, orders, retailers, status, time],
  )

  useEffect(() => {
    const orderList = Object.keys(orders).filter((addr) => filterOrder(addr))
    if (orderList.length) return setOrderListAddress(orderList)
    return setOrderListAddress([])
  }, [filterOrder, orders])

  return orderListAddress
}
