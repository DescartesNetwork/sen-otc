import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

import { OrderState } from 'store/order.reducer'

export const SORTING_TYPES = ['Price', 'Recent']
export enum SortedBy {
  AscendingPrice = 'AscendingPrice',
  DescendingPrice = 'DescendingPrice',
  AscendingRecent = 'AscendingRecent',
  DescendingRecent = 'DescendingRecent',
}
export type SortContext = {
  sort: SortedBy
  setSort: (sort: SortedBy) => void
}

/**
 * Context
 */
const Context = createContext<SortContext>({
  sort: SortedBy.AscendingPrice,
  setSort: () => {},
})

/**
 * Provider
 */
export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sort, setSort] = useState<SortedBy>(SortedBy.AscendingPrice)
  const value = useMemo(() => ({ sort, setSort }), [sort])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useSort = () => {
  return useContext<SortContext>(Context)
}

/**
 * Utility
 */
export const sortPrice = (action: OtcMode = 'Buy', sort?: SortedBy) => {
  return (orders: OrderState) => {
    let filteredOrders: OrderState = {}
    const orderAddresses = Object.keys(orders).sort((i, j) => {
      const m = orders[i]
      const n = orders[j]
      const x = action === 'Buy' ? m.b.div(m.a) : m.a.div(m.b)
      const y = action === 'Buy' ? n.b.div(n.a) : n.a.div(n.b)
      if (sort === SortedBy.AscendingPrice) {
        return x.gt(y) ? 1 : -1
      } else if (sort === SortedBy.DescendingPrice) {
        return x.gt(y) ? -1 : 1
      } else {
        return 0
      }
    })
    for (const orderAddress of orderAddresses)
      filteredOrders[orderAddress] = orders[orderAddress]
    return filteredOrders
  }
}
export const sortRecent = (sort?: SortedBy) => {
  return (orders: OrderState) => {
    let filteredOrders: OrderState = {}
    const orderAddresses = Object.keys(orders).sort((i, j) => {
      const m = orders[i]
      const n = orders[j]
      const u = m.startDate
      const v = n.startDate
      if (sort === SortedBy.AscendingRecent) {
        return u.gt(v) ? -1 : 1
      } else if (sort === SortedBy.DescendingRecent) {
        return u.gt(v) ? 1 : -1
      } else {
        return 0
      }
    })
    for (const orderAddress of orderAddresses)
      filteredOrders[orderAddress] = orders[orderAddress]
    return filteredOrders
  }
}
