import { useOrderSelector } from './useOrder'
import { filterByAction, useAction } from 'providers/action.provider'
import {
  filterPartneredToken,
  filterPaymentMethod,
  useSymbol,
} from 'providers/symbol.provider'
import { sortByPrice, sortByRecent, useSort } from 'providers/sort.provider'
import { filterByStatus, useStatus } from 'providers/status.provider'

/**
 * Apply all filter/sort to orders
 * @returns
 */
export const useFilteredOrders = () => {
  const { action } = useAction()
  const { status } = useStatus()
  const { paymentMethod, partneredToken } = useSymbol()
  const { sort } = useSort()

  const orders = useOrderSelector((orders) => {
    orders = filterByAction(action)(orders)
    orders = filterByStatus(status)(orders)
    orders = filterPaymentMethod(action, paymentMethod)(orders)
    orders = filterPartneredToken(action, partneredToken)(orders)
    orders = sortByPrice(action, sort)(orders)
    orders = sortByRecent(sort)(orders)
    return orders
  })
  return orders
}
