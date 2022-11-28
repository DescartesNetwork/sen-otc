import BN from 'bn.js'
import dayjs from 'dayjs'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { decimalize } from 'helpers/util'
import { AppDispatch, AppState } from 'store'
import { updateNewOrder } from 'store/newOrder.reducer'
import { useMetadataBySymbol } from './useToken'
import { useBalance } from './useWallet'

/**
 * Mode
 * @returns
 */
export const validateMode = (mode: OtcMode) => {
  if (!mode) return 'The order mode cannot be empty.'
  if (mode !== 'Buy' && mode !== 'Sell')
    return 'The order mode must be Buy or Sell only.'
  return ''
}
export const useMode = () => {
  const dispatch = useDispatch<AppDispatch>()
  const mode = useSelector(({ newOrder }: AppState) => newOrder.mode)
  const modeError = useSelector(({ newOrder }: AppState) => newOrder.modeError)

  const setMode = useCallback(
    async (mode: OtcMode) => {
      // Validate
      const modeError = validateMode(mode)
      // Submit
      return dispatch(
        updateNewOrder({
          mode,
          modeError,
          bidToken: '',
          bidAmount: '',
          askToken: '',
          askAmount: '',
          askPrice: '',
        }),
      )
    },
    [dispatch],
  )

  return { mode, modeError, setMode }
}

/**
 * Started at
 * @returns
 */
export const validateStartedAt = (startedAt: string) => {
  if (!startedAt) return 'The start date cannot be empty.'
  const start = Number(new Date(startedAt))
  if (Date.now() - start > 60 * 60 * 1000)
    return 'The start date is too far in the past. It should be less than 1 hour to the current date.'
  if (start - Date.now() > 365 * 24 * 60 * 60 * 1000)
    return 'The start date is too far in the future. It should be less than 1 year from the current date.'
  return ''
}
export const useStartedAt = () => {
  const dispatch = useDispatch<AppDispatch>()
  const startedAt = useSelector(({ newOrder }: AppState) => newOrder.startedAt)
  const startedAtError = useSelector(
    ({ newOrder }: AppState) => newOrder.startedAtError,
  )

  const setStartedAt = useCallback(
    async (startedAt: string) => {
      // Validate
      const startedAtError = validateStartedAt(startedAt)
      // Submit
      return dispatch(updateNewOrder({ startedAt, startedAtError }))
    },
    [dispatch],
  )
  return { startedAt, startedAtError, setStartedAt }
}

/**
 * Ended at
 * @returns
 */
export const validateEndedAt = (startedAt: string, endedAt: string) => {
  if (!startedAt) return 'Please schedule the start date first.'
  if (!endedAt) return 'The start date cannot be empty.'
  const start = Number(new Date(startedAt))
  const end = Number(new Date(endedAt))
  if (Date.now() > end) return 'The start date cannot be set in the past.'
  if (start >= end)
    return `The end date must be greater than the start date at ${dayjs(
      start,
    ).format('hh:mm:ss A, DD MMM YY')}.`
  return ''
}
export const useEndedAt = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { startedAt } = useStartedAt()
  const endedAt = useSelector(({ newOrder }: AppState) => newOrder.endedAt)
  const endedAtError = useSelector(
    ({ newOrder }: AppState) => newOrder.endedAtError,
  )

  const setEndedAt = useCallback(
    async (endedAt: string) => {
      // Validate
      const endedAtError = validateEndedAt(startedAt, endedAt)
      // Submit
      return dispatch(updateNewOrder({ endedAt, endedAtError }))
    },
    [startedAt, dispatch],
  )

  return { endedAt, endedAtError, setEndedAt }
}

/**
 * Bid token state
 * @returns
 */
export const useBidToken = (defaultBidToken?: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const bidToken = useSelector(({ newOrder }: AppState) => newOrder.bidToken)

  const setBidToken = useCallback(
    async (bidToken: string) => {
      return dispatch(updateNewOrder({ bidToken }))
    },
    [dispatch],
  )

  useEffect(() => {
    if (defaultBidToken) dispatch(updateNewOrder({ bidToken: defaultBidToken }))
  }, [dispatch, defaultBidToken])

  return { bidToken, setBidToken }
}

/**
 * Bid amount state
 * @returns
 */
export const validateBidAmount = (
  bidAmount: string,
  decimals: number,
  balance: BN,
) => {
  if (isNaN(Number(bidAmount)) || isNaN(parseFloat(bidAmount)))
    return 'Invalid bid amount.'
  if (typeof decimals !== 'number' || !BN.isBN(balance))
    return 'Please select bid token first.'
  if (decimalize(Number(bidAmount), decimals).gt(balance))
    return 'Not enough balance'
  return ''
}
export const useBidAmount = () => {
  const dispatch = useDispatch<AppDispatch>()
  const bidAmount = useSelector(({ newOrder }: AppState) => newOrder.bidAmount)
  const bidAmountError = useSelector(
    ({ newOrder }: AppState) => newOrder.bidAmountError,
  )
  const { bidToken } = useBidToken()
  const { decimals, address } = useMetadataBySymbol(bidToken) || {
    decimals: 0,
    address: '',
  }
  const { amount } = useBalance(address)

  const setBidAmount = useCallback(
    async (bidAmount: string) => {
      // Validate
      const bidAmountError = validateBidAmount(bidAmount, decimals, amount)
      // Submit
      return dispatch(updateNewOrder({ bidAmount, bidAmountError }))
    },
    [dispatch, decimals, amount],
  )

  const clear = useCallback(() => {
    dispatch(updateNewOrder({ bidAmount: '', bidAmountError: '' }))
  }, [dispatch])

  return { bidAmount, setBidAmount, bidAmountError, clear }
}

/**
 * Ask token state
 * @returns
 */
export const useAskToken = (defaultAskToken?: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const askToken = useSelector(({ newOrder }: AppState) => newOrder.askToken)

  const setAskToken = useCallback(
    async (askToken: string) => {
      return dispatch(updateNewOrder({ askToken }))
    },
    [dispatch],
  )

  useEffect(() => {
    if (defaultAskToken) dispatch(updateNewOrder({ askToken: defaultAskToken }))
  }, [dispatch, defaultAskToken])

  return { askToken, setAskToken }
}

/**
 * Ask amount state
 * @returns
 */
export const validateAskAmount = (askAmount: string) => {
  if (isNaN(Number(askAmount)) || isNaN(parseFloat(askAmount)))
    return 'Invalid ask amount.'
  return ''
}
export const useAskAmount = () => {
  const dispatch = useDispatch<AppDispatch>()
  const askAmount = useSelector(({ newOrder }: AppState) => newOrder.askAmount)
  const askAmountError = useSelector(
    ({ newOrder }: AppState) => newOrder.askAmountError,
  )

  const setAskAmount = useCallback(
    async (askAmount: string) => {
      // Validate
      const askAmountError = validateAskAmount(askAmount)
      // Submit
      return dispatch(updateNewOrder({ askAmount, askAmountError }))
    },
    [dispatch],
  )

  const clear = useCallback(() => {
    dispatch(updateNewOrder({ askAmount: '', askAmountError: '' }))
  }, [dispatch])

  return { askAmount, setAskAmount, askAmountError, clear }
}

/**
 * Ask price state
 * @returns
 */
export const validateAskPrice = (askPrice: string) => {
  if (isNaN(Number(askPrice)) || isNaN(parseFloat(askPrice)))
    return 'Invalid ask price.'
  return ''
}
export const useAskPrice = () => {
  const dispatch = useDispatch<AppDispatch>()
  const askPrice = useSelector(({ newOrder }: AppState) => newOrder.askPrice)
  const askPriceError = useSelector(
    ({ newOrder }: AppState) => newOrder.askPriceError,
  )

  const setAskPrice = useCallback(
    async (askPrice: string) => {
      // Validate
      const askPriceError = validateAskPrice(askPrice)
      // Submit
      return dispatch(updateNewOrder({ askPrice, askPriceError }))
    },
    [dispatch],
  )

  const clear = useCallback(() => {
    dispatch(updateNewOrder({ askPrice: '', askPriceError: '' }))
  }, [dispatch])

  return { askPrice, setAskPrice, askPriceError, clear }
}
