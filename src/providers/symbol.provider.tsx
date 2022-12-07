import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

import configs from 'configs'
import { OrderState } from 'store/order.reducer'
import { isAddress } from '@sentre/otc'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs

export type SymbolContext = {
  paymentMethod: string
  setPaymentMethod: (paymentMethod: string) => void
  partneredToken: string
  setPartneredToken: (partneredToken: string) => void
}

/**
 * Context
 */
const Context = createContext<SymbolContext>({
  paymentMethod: 'USDC',
  setPaymentMethod: () => {},
  partneredToken: 'All',
  setPartneredToken: () => {},
})

/**
 * Provider
 */
export const SymbolProvider = ({ children }: { children: ReactNode }) => {
  const [paymentMethod, setPaymentMethod] = useState('USDC')
  const [partneredToken, setPartneredToken] = useState('All')
  const value = useMemo(
    () => ({
      paymentMethod,
      setPaymentMethod,
      partneredToken,
      setPartneredToken,
    }),
    [paymentMethod, partneredToken],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useSymbol = () => {
  return useContext<SymbolContext>(Context)
}

/**
 * Utility
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
