import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'

import { AppState } from 'store'
import { OrderState } from 'store/order.reducer'
import { useMetadataByAddress } from './useToken'
import { undecimalize } from 'helpers/util'
import { filterAction } from 'providers/action.provider'

/**
 * Get all orders/offers
 * @returns
 */
export const useOrders = () => {
  const orders = useSelector(({ order }: AppState) => order)
  return orders
}

/**
 * Get selective orders/offers
 * @returns
 */
export const useOrderSelector = <T>(selector: (orders: OrderState) => T): T => {
  const orders = useSelector(({ order }: AppState) => selector(order))
  return orders
}

/**
 * Get all buying orders
 * @returns
 */
export const useBuyingOrders = () => {
  const buyingOrders = useOrderSelector(filterAction('Buy'))
  return buyingOrders
}

/**
 * Get all selling orders
 * @returns
 */
export const useSellingOrders = () => {
  const sellingOrders = useOrderSelector(filterAction('Sell'))
  return sellingOrders
}

/**
 * Derive order mode
 * @param orderAddress
 */
export const useOrderMode = (orderAddress: string): OtcMode | undefined => {
  const buyingOrders = useBuyingOrders()
  const sellingOrders = useSellingOrders()
  if (Object.keys(buyingOrders).includes(orderAddress)) return 'Buy'
  if (Object.keys(sellingOrders).includes(orderAddress)) return 'Sell'
  return undefined
}

/**
 * Get order payment method
 * @param orderAddress
 * @returns
 */
export const useOrderPaymentMethod = (orderAddress: string) => {
  const mode = useOrderMode(orderAddress)
  const { aToken, bToken } =
    useOrderSelector((orders) => orders[orderAddress]) || {}
  const paymentMethodAddress = useMemo(() => {
    if (!aToken || !bToken || !mode) return ''
    if (mode === 'Buy') return bToken.toBase58()
    return aToken.toBase58()
  }, [mode, aToken, bToken])
  const paymentMethod = useMetadataByAddress(paymentMethodAddress)

  return paymentMethod
}

/**
 * Get order partnered token
 * @param orderAddress
 * @returns
 */
export const useOrderPartneredToken = (orderAddress: string) => {
  const mode = useOrderMode(orderAddress)
  const { aToken, bToken } =
    useOrderSelector((orders) => orders[orderAddress]) || {}
  const partneredTokenAddress = useMemo(() => {
    if (!aToken || !bToken || !mode) return ''
    if (mode === 'Buy') return aToken.toBase58()
    return bToken.toBase58()
  }, [mode, aToken, bToken])
  const partneredToken = useMetadataByAddress(partneredTokenAddress)

  return partneredToken
}

/**
 * Get offered price
 * @param orderAddress
 * @returns
 */
export const useOfferedPrice = (orderAddress: string) => {
  const mode = useOrderMode(orderAddress)
  const { a, b } = useOrderSelector((orders) => orders[orderAddress]) || {}

  const paymentMethod = useOrderPartneredToken(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)

  const [paymentMethodAmount, partneredTokenAmount] = useMemo(() => {
    if (!a || !b || !mode) return []
    if (mode === 'Buy') return [b, a]
    return [a, b]
  }, [mode, a, b])

  const price = useMemo(() => {
    if (
      !paymentMethod ||
      !partneredToken ||
      !paymentMethodAmount ||
      !partneredTokenAmount
    )
      return 0
    const x = undecimalize(paymentMethodAmount, paymentMethod.decimals)
    const y = undecimalize(partneredTokenAmount, partneredToken.decimals)
    return x / y
  }, [paymentMethod, partneredToken, paymentMethodAmount, partneredTokenAmount])

  return price
}

/**
 * My orders
 * @returns
 */
export const useMyOrders = () => {
  const { publicKey } = useWallet()
  const orders = useOrderSelector((orders) =>
    Object.keys(orders)
      .filter(
        (address) => publicKey && publicKey.equals(orders[address].authority),
      )
      .map((address) => orders[address]),
  )
  return orders
}
