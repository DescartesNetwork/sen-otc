import { OrderStates } from '@sentre/otc'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import isEqual from 'react-fast-compare'

import { OrderState } from 'store/order.reducer'

export enum OrderStatus {
  All = 'All',
  Paused = 'Paused',
  Upcomming = 'Upcoming',
  Active = 'Active',
  Complete = 'Complete',
}

export type StatusContext = {
  status: OrderStatus
  setStatus: (status: OrderStatus) => void
}

/**
 * Context
 */
const Context = createContext<StatusContext>({
  status: OrderStatus.Active,
  setStatus: () => {},
})

/**
 * Provider
 */
export const StatusProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.Active)
  const value = useMemo(() => ({ status, setStatus }), [status])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useStatus = () => {
  return useContext<StatusContext>(Context)
}

/**
 * Utility
 */
export const filterByStatus = (action: OrderStatus = OrderStatus.All) => {
  return (orders: OrderState) => {
    if (action === OrderStatus.All) return orders
    let filteredOrders: OrderState = {}
    Object.keys(orders).forEach((orderAddress) => {
      const { startDate, endDate, state } = orders[orderAddress]
      const current = Math.ceil(Date.now() / 1000)
      const start = startDate.toNumber()
      const end = endDate.toNumber()
      if (
        (action === OrderStatus.Paused && isEqual(state, OrderStates.Paused)) ||
        (action === OrderStatus.Upcomming && current < start) ||
        (action === OrderStatus.Active && current >= start && current < end) ||
        (action === OrderStatus.Complete && current >= end)
      )
        filteredOrders[orderAddress] = orders[orderAddress]
    })
    return filteredOrders
  }
}
