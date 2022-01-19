import { AppState } from 'app/model'

import { useSelector } from 'react-redux'
import { OrdersState } from 'app/model/orders.controller'
import { useCallback, useEffect, useState } from 'react'
import { useMint, useWallet } from '@senhub/providers'

export const useOrdersWithMode = (): OrdersState => {
  const {
    orders,
    retailers,
    main: { retailerMode },
  } = useSelector((state: AppState) => state)
  const { wallet } = useWallet()
  const { tokenProvider } = useMint()
  const [filteredOrders, setFilteredOrders] = useState<OrdersState>({})

  const getUserOrders = useCallback((): OrdersState => {
    const userOrders: OrdersState = {}
    for (const addr in orders) {
      const orderData = orders[addr]
      if (orderData.owner === wallet.address) userOrders[addr] = orderData
    }
    return userOrders
  }, [orders, wallet.address])

  const getRetailerOrders = useCallback((): OrdersState => {
    const retailerOrders: OrdersState = {}
    for (const addr in orders) {
      const orderData = orders[addr]
      const retailerData = retailers[orderData.retailer]
      if (retailerData.owner === wallet.address)
        retailerOrders[addr] = orderData
    }
    return retailerOrders
  }, [orders, retailers, wallet.address])

  const filterOrders = useCallback(async () => {
    const filteredOrders: OrdersState = {}
    const orders = retailerMode ? getRetailerOrders() : getUserOrders()
    // Filter single token
    for (const addr in orders) {
      const orderData = orders[addr]
      const retailerData = retailers?.[orderData.retailer]
      const { mint_bid, mint_ask } = retailerData || {}
      const bidToken = await tokenProvider.findByAddress(mint_bid)
      const askToken = await tokenProvider.findByAddress(mint_ask)
      if (bidToken && askToken) filteredOrders[addr] = orderData
    }
    return setFilteredOrders(filteredOrders)
  }, [getRetailerOrders, getUserOrders, retailerMode, retailers, tokenProvider])

  useEffect(() => {
    filterOrders()
  }, [filterOrders])

  return filteredOrders
}
