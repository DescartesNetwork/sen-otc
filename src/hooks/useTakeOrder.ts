import BN from 'bn.js'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderData } from '@sentre/otc'

import { decimalize, undecimalize } from 'helpers/util'
import { AppDispatch, AppState } from 'store'
import { updateTakeOrder } from 'store/takeOrder.reducer'
import { useBalance } from './useWallet'
import { useOrderSelector } from './useOrder'
import { useRouteParam } from './useParam'
import { useMetadataByAddress } from './useToken'
import { OrderState } from 'store/order.reducer'

/**
 * Get order data by order address which is parsed from the query param
 */
export const useCurrentOrder = (): OrderData | undefined => {
  const orderAddress = useRouteParam('orderAddress') || ''
  const order = useOrderSelector((orders: OrderState) => orders[orderAddress])
  return order
}

/**
 * Derive paid token metadata
 * @returns
 */
export const usePaidToken = () => {
  const { bToken } = useCurrentOrder() || {}
  const paidToken = useMetadataByAddress(bToken?.toBase58() || '')
  return paidToken
}

/**
 * Paid amount state
 * @returns
 */
export const validatePaidAmount = (
  paidAmount: string,
  decimals: number | undefined,
  balance: BN | undefined,
) => {
  if (isNaN(Number(paidAmount)) || isNaN(parseFloat(paidAmount)))
    return 'Invalid paid amount.'
  if (typeof decimals !== 'number' || !BN.isBN(balance))
    return 'Please select paid token first.'
  if (decimalize(Number(paidAmount), decimals).gt(balance))
    return 'Not enough balance'
  return ''
}
export const usePaidAmount = () => {
  const dispatch = useDispatch<AppDispatch>()
  const paidAmount = useSelector(
    ({ takeOrder }: AppState) => takeOrder.paidAmount,
  )
  const paidAmountError = useSelector(
    ({ takeOrder }: AppState) => takeOrder.paidAmountError,
  )
  const { decimals: paidDecimals, address: paidTokenAddress } =
    usePaidToken() || { address: '' }
  const { decimals: receivedDecimals } = useReceivedToken() || {}
  const { amount } = useBalance(paidTokenAddress)
  const { a, b } = useCurrentOrder() || {}
  const { setReceivedAmount, clear: clearReceivedAmount } = useReceivedAmount()

  const setPaidAmount = useCallback(
    async (paidAmount: string) => {
      // Validate
      const paidAmountError = validatePaidAmount(
        paidAmount,
        paidDecimals,
        amount,
      )
      // Compute the received amount
      if (
        paidAmountError ||
        !a ||
        !b ||
        typeof paidDecimals !== 'number' ||
        typeof receivedDecimals !== 'number'
      ) {
        await setReceivedAmount('')
      } else {
        const paidAmountBN = decimalize(Number(paidAmount), paidDecimals)
        const receivedAmountBN = paidAmountBN.mul(a).div(b)
        const receivedAmount = undecimalize(receivedAmountBN, receivedDecimals)
        await setReceivedAmount(receivedAmount.toString())
      }
      // Submit
      return dispatch(updateTakeOrder({ paidAmount, paidAmountError }))
    },
    [dispatch, amount, setReceivedAmount, a, b, paidDecimals, receivedDecimals],
  )

  const clear = useCallback(async () => {
    await clearReceivedAmount()
    return dispatch(updateTakeOrder({ paidAmount: '', paidAmountError: '' }))
  }, [dispatch, clearReceivedAmount])

  return { paidAmount, setPaidAmount, paidAmountError, clear }
}

/**
 * Derive received token metadata
 * @returns
 */
export const useReceivedToken = () => {
  const { aToken } = useCurrentOrder() || {}
  const receivedToken = useMetadataByAddress(aToken?.toBase58() || '')
  return receivedToken
}

/**
 * Received amount state
 * @returns
 */
export const validateReceivedAmount = (receivedAmount: string) => {
  if (isNaN(Number(receivedAmount)) || isNaN(parseFloat(receivedAmount)))
    return 'Invalid received amount.'
  return ''
}
export const useReceivedAmount = () => {
  const dispatch = useDispatch<AppDispatch>()
  const receivedAmount = useSelector(
    ({ takeOrder }: AppState) => takeOrder.receivedAmount,
  )
  const receivedAmountError = useSelector(
    ({ takeOrder }: AppState) => takeOrder.receivedAmountError,
  )

  const setReceivedAmount = useCallback(
    async (receivedAmount: string) => {
      // Validate
      const receivedAmountError = validateReceivedAmount(receivedAmount)
      // Submit
      return dispatch(updateTakeOrder({ receivedAmount, receivedAmountError }))
    },
    [dispatch],
  )

  const clear = useCallback(async () => {
    return dispatch(
      updateTakeOrder({ receivedAmount: '', receivedAmountError: '' }),
    )
  }, [dispatch])

  return { receivedAmount, setReceivedAmount, receivedAmountError, clear }
}
