import BN from 'bn.js'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { decimalize } from 'helpers/util'
import { AppDispatch, AppState } from 'store'
import { updateTakeOrder } from 'store/takeOrder.reducer'
import { useBalance } from './useWallet'
import {
  useOrderMode,
  useOrderPaymentMethod,
  useOrderPartneredToken,
} from './useOrder'
import { useRouteParam } from './useQueryParam'

/**
 * Derive paid token metadata
 * @returns
 */
export const usePaidToken = () => {
  const orderAddress = useRouteParam('orderAddress') || ''
  const mode = useOrderMode(orderAddress)
  const paymentMethod = useOrderPaymentMethod(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)

  const paidToken = useMemo(() => {
    if (!mode || !paymentMethod || !partneredToken) return undefined
    if (mode === 'Buy') return paymentMethod
    else if (mode === 'Sell') return partneredToken
    return undefined
  }, [mode, paymentMethod, partneredToken])

  return paidToken
}

/**
 * Paid amount state
 * @returns
 */
export const validatePaidAmount = (
  paidAmount: string,
  decimals: number,
  balance: BN,
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
  const { decimals, address } = usePaidToken() || { decimals: 0, address: '' }
  const { amount } = useBalance(address)

  const setPaidAmount = useCallback(
    async (paidAmount: string) => {
      // Validate
      const paidAmountError = validatePaidAmount(paidAmount, decimals, amount)
      // Submit
      return dispatch(updateTakeOrder({ paidAmount, paidAmountError }))
    },
    [dispatch, decimals, amount],
  )

  const clear = useCallback(() => {
    dispatch(updateTakeOrder({ paidAmount: '', paidAmountError: '' }))
  }, [dispatch])

  return { paidAmount, setPaidAmount, paidAmountError, clear }
}

/**
 * Derive received token metadata
 * @returns
 */
export const useReceivedToken = () => {
  const orderAddress = useRouteParam('orderAddress') || ''
  const mode = useOrderMode(orderAddress)
  const paymentMethod = useOrderPaymentMethod(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)

  const receivedToken = useMemo(() => {
    if (!mode || !paymentMethod || !partneredToken) return undefined
    if (mode === 'Buy') return partneredToken
    else if (mode === 'Sell') return paymentMethod
    return undefined
  }, [mode, paymentMethod, partneredToken])

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

  const clear = useCallback(() => {
    dispatch(updateTakeOrder({ receivedAmount: '', receivedAmountError: '' }))
  }, [dispatch])

  return { receivedAmount, setReceivedAmount, receivedAmountError, clear }
}
