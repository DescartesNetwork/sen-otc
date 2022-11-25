import { useSelector } from 'react-redux'

import { AppState } from 'store'
import { OrderState } from 'store/order.reducer'
import { AcceptedPaymentMetadata } from 'helpers/acceptedPayments'
import { OtcAction } from 'components/filters/buySellFilter'
import configs from 'configs'

const {
  otc: { acceptedPayments },
} = configs

/**
 * Buy/Sell filter
 * @param orders
 * @returns
 */
export const otcActionSelector = (action: OtcAction = OtcAction.Buy) => {
  const key = action === OtcAction.Buy ? 'aToken' : 'bToken'
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
