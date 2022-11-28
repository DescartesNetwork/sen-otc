import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'store'
import { OrderState } from 'store/order.reducer'
import { AcceptedPaymentMetadata } from 'helpers/acceptedPayments'
import { useMetadataByAddress } from './useToken'
import { undecimalize } from 'helpers/util'

const {
  otc: { acceptedPayments },
} = configs

/**
 * Buy/Sell filter
 * @param action
 * @returns
 */
export const otcActionSelector = (action: OtcMode = 'Buy') => {
  const key = action === 'Buy' ? 'aToken' : 'bToken'
  return (orders: OrderState) => {
    let filteredOrders: OrderState = {}
    Object.keys(orders).forEach((orderAddress) => {
      const { [key]: token } = orders[orderAddress]
      if (
        acceptedPayments.findIndex(
          ({ address }: AcceptedPaymentMetadata) =>
            address === token.toBase58(),
        ) >= 0
      ) {
        filteredOrders[orderAddress] = orders[orderAddress]
      }
    })
    return filteredOrders
  }
}

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
 * Derive order mode
 * @param orderAddress
 */
export const useOrderMode = (orderAddress: string): OtcMode | undefined => {
  const buyOrders = useOrderSelector(otcActionSelector('Buy'))
  const sellOrders = useOrderSelector(otcActionSelector('Sell'))
  if (Object.keys(buyOrders).includes(orderAddress)) return 'Buy'
  if (Object.keys(sellOrders).includes(orderAddress)) return 'Sell'
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
    if (!aToken || !bToken) return ''
    if (mode === 'Buy') return aToken.toBase58()
    else if (mode === 'Sell') return bToken.toBase58()
    else return ''
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
    if (!aToken || !bToken) return ''
    if (mode === 'Buy') return bToken.toBase58()
    else if (mode === 'Sell') return aToken.toBase58()
    else return ''
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
    if (!a || !b) return []
    if (mode === 'Buy') return [a, b]
    else if (mode === 'Sell') return [b, a]
    else return []
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
