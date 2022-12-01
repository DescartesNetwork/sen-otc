import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import configs from 'configs'
import { AppDispatch, AppState } from 'store'
import { OrderStatus, SortedBy, updateFilter } from 'store/filter.reducer'
import { OrderState } from 'store/order.reducer'
import { useOrderSelector } from './useOrder'
import { isAddress } from '@sentre/otc'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs

/**
 * Action
 * @returns
 */
export const filterByAction = (action: OtcMode = 'Buy') => {
  const key = action === 'Buy' ? 'bToken' : 'aToken'
  return (orders: OrderState) => {
    let filteredOrders: OrderState = {}
    Object.keys(orders).forEach((orderAddress) => {
      const { [key]: token } = orders[orderAddress]
      if (
        acceptedPayments.findIndex(
          ({ address }: TokenMetadata) => address === token.toBase58(),
        ) >= 0
      )
        filteredOrders[orderAddress] = orders[orderAddress]
    })
    return filteredOrders
  }
}
export const useAction = () => {
  const dispatch = useDispatch<AppDispatch>()
  const action = useSelector(({ filter }: AppState) => filter.action)
  const setAction = useCallback(
    (action: OtcMode) => dispatch(updateFilter({ action })),
    [dispatch],
  )
  return { action, setAction }
}

/**
 * Payment method
 * @returns
 */
export const filterPaymentMethod = (
  action: OtcMode = 'Buy',
  partneredToken: string = 'SNTR',
) => {
  return (orders: OrderState) => {
    let filteredOrders: OrderState = {}
    const key = action === 'Buy' ? 'bToken' : 'aToken'
    const { address } =
      acceptedPayments.find(({ symbol }) => symbol === partneredToken) || {}
    if (!isAddress(address)) return filteredOrders
    Object.keys(orders).forEach((orderAddress) => {
      const { [key]: token } = orders[orderAddress]
      if (address === token.toBase58())
        filteredOrders[orderAddress] = orders[orderAddress]
    })
    return filteredOrders
  }
}
export const usePaymentMethod = () => {
  const dispatch = useDispatch<AppDispatch>()
  const paymentMethod = useSelector(
    ({ filter }: AppState) => filter.paymentMethod,
  )
  const setPaymentMethod = useCallback(
    (paymentMethod: string) => dispatch(updateFilter({ paymentMethod })),
    [dispatch],
  )
  return { paymentMethod, setPaymentMethod }
}

/**
 * Partnered token
 * @returns
 */
export const filterPartneredToken = (
  action: OtcMode = 'Buy',
  partneredToken: string = 'All',
) => {
  return (orders: OrderState) => {
    if (partneredToken === 'All') return orders
    let filteredOrders: OrderState = {}
    const key = action === 'Buy' ? 'aToken' : 'bToken'
    const { address } =
      partneredTokens.find(({ symbol }) => symbol === partneredToken) || {}
    if (!isAddress(address)) return filteredOrders
    Object.keys(orders).forEach((orderAddress) => {
      const { [key]: token } = orders[orderAddress]
      if (address === token.toBase58())
        filteredOrders[orderAddress] = orders[orderAddress]
    })
    return filteredOrders
  }
}
export const usePartneredToken = () => {
  const dispatch = useDispatch<AppDispatch>()
  const partneredToken = useSelector(
    ({ filter }: AppState) => filter.partneredToken,
  )
  const setPartneredToken = useCallback(
    (partneredToken: string) => dispatch(updateFilter({ partneredToken })),
    [dispatch],
  )
  return { partneredToken, setPartneredToken }
}

/**
 * Keyword
 * @returns
 */
export const useKeyword = () => {
  const dispatch = useDispatch<AppDispatch>()
  const keyword = useSelector(({ filter }: AppState) => filter.keyword)
  const setKeyword = useCallback(
    (keyword: string) => dispatch(updateFilter({ keyword })),
    [dispatch],
  )
  return { keyword, setKeyword }
}

/**
 * Sort
 * @returns
 */
export const useSort = () => {
  const dispatch = useDispatch<AppDispatch>()
  const sort = useSelector(({ filter }: AppState) => filter.sort)
  const setSort = useCallback(
    (sort: SortedBy) => dispatch(updateFilter({ sort })),
    [dispatch],
  )
  return { sort, setSort }
}

/**
 * Status
 */
export const filterByStatus = (action: OrderStatus = OrderStatus.All) => {
  return (orders: OrderState) => {
    if (action === OrderStatus.All) return orders
    let filteredOrders: OrderState = {}
    Object.keys(orders).forEach((orderAddress) => {
      const { startDate, endDate } = orders[orderAddress]
      const current = Math.ceil(Date.now() / 1000)
      const start = startDate.toNumber()
      const end = endDate.toNumber()
      if (
        (action === OrderStatus.Upcomming && current < start) ||
        (action === OrderStatus.Active && current >= start && current < end) ||
        (action === OrderStatus.Complete && current >= end)
      )
        filteredOrders[orderAddress] = orders[orderAddress]
    })
    return filteredOrders
  }
}
export const useOrderStatus = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector(({ filter }: AppState) => filter.status)
  const setStatus = useCallback(
    (status: OrderStatus) => dispatch(updateFilter({ status })),
    [dispatch],
  )
  return { status, setStatus }
}

export const useFilteredOrder = () => {
  const { action } = useAction()
  const { status } = useOrderStatus()
  const { paymentMethod } = usePaymentMethod()
  const { partneredToken } = usePartneredToken()

  const orders = useOrderSelector((orders) => {
    orders = filterByAction(action)(orders)
    orders = filterByStatus(status)(orders)
    orders = filterPaymentMethod(action, paymentMethod)(orders)
    orders = filterPartneredToken(action, partneredToken)(orders)
    return orders
  })
  return orders
}
