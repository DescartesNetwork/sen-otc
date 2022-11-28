import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'store'
import { OrderState } from 'store/order.reducer'
import { AcceptedPaymentMetadata } from 'helpers/acceptedPayments'
import { useAction } from './useFilter'
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
 * Get order payment method
 * @param orderAddress
 * @returns
 */
export const useOrderPaymentMethod = (orderAddress: string) => {
  const { action } = useAction()
  const { aToken, bToken } = useOrderSelector((orders) => orders[orderAddress])
  const paymentMethodAddress = useMemo(() => {
    if (action === 'Buy') return aToken.toBase58()
    else return bToken.toBase58()
  }, [action, aToken, bToken])
  const paymentMethod = useMetadataByAddress(paymentMethodAddress)

  return paymentMethod
}

/**
 * Get order partnered token
 * @param orderAddress
 * @returns
 */
export const useOrderPartneredToken = (orderAddress: string) => {
  const { action } = useAction()
  const { aToken, bToken } = useOrderSelector((orders) => orders[orderAddress])
  const partneredTokenAddress = useMemo(() => {
    if (action === 'Buy') return bToken.toBase58()
    else return aToken.toBase58()
  }, [action, aToken, bToken])
  const partneredToken = useMetadataByAddress(partneredTokenAddress)

  return partneredToken
}

/**
 * Get offered price
 * @param orderAddress
 * @returns
 */
export const useOfferedPrice = (orderAddress: string) => {
  const { action } = useAction()
  const { a, b } = useOrderSelector((orders) => orders[orderAddress])

  const paymentMethod = useOrderPartneredToken(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)

  const [paymentMethodAmount, partneredTokenAmount] = useMemo(() => {
    if (action === 'Buy') return [a, b]
    else return [b, a]
  }, [action, a, b])

  const price = useMemo(() => {
    if (!paymentMethod || !partneredToken) return 0
    const x = undecimalize(paymentMethodAmount, paymentMethod.decimals)
    const y = undecimalize(partneredTokenAmount, partneredToken.decimals)
    return x / y
  }, [paymentMethod, partneredToken, paymentMethodAmount, partneredTokenAmount])

  return price
}
