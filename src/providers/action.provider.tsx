import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

import configs from 'configs'
import { OrderState } from 'store/order.reducer'

const {
  otc: { acceptedPayments },
} = configs

export type ActionContext = {
  action: OtcMode
  setAction: (action: OtcMode) => void
}

/**
 * Context
 */
const Context = createContext<ActionContext>({
  action: 'Buy',
  setAction: () => {},
})

/**
 * Provider
 */
export const ActionProvider = ({ children }: { children: ReactNode }) => {
  const [action, setAction] = useState<OtcMode>('Buy')
  const value = useMemo(() => ({ action, setAction }), [action])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useAction = () => {
  return useContext<ActionContext>(Context)
}

/**
 * Utility
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
