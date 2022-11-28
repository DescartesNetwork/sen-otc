import BN from 'bn.js'
import dayjs from 'dayjs'
import { decimalize } from 'helpers/util'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  const [error, setError] = useState('')
  const mode = useSelector(({ newOrder }: AppState) => newOrder.mode)

  const setMode = useCallback(
    async (mode: OtcMode) => {
      // Validate
      const error = validateMode(mode)
      setError(error)
      // Submit
      if (!error)
        dispatch(
          updateNewOrder({
            mode,
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

  return { mode, error, setMode }
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
  const [error, setError] = useState('')
  const startedAt = useSelector(({ newOrder }: AppState) => newOrder.startedAt)

  const setStartedAt = useCallback(
    async (startedAt: string) => {
      // Validate
      const error = validateStartedAt(startedAt)
      setError(error)
      // Submit
      if (!error) dispatch(updateNewOrder({ startedAt }))
    },
    [dispatch],
  )
  return { startedAt, error, setStartedAt }
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
  const [error, setError] = useState('')
  const { startedAt } = useStartedAt()
  const endedAt = useSelector(({ newOrder }: AppState) => newOrder.endedAt)

  const setEndedAt = useCallback(
    async (endedAt: string) => {
      // Validate
      const error = validateEndedAt(startedAt, endedAt)
      setError(error)
      // Submit
      if (!error) dispatch(updateNewOrder({ endedAt }))
    },
    [startedAt, dispatch],
  )

  return { endedAt, error, setEndedAt }
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
  const [error, setError] = useState('')
  const bidAmount = useSelector(({ newOrder }: AppState) => newOrder.bidAmount)
  const { bidToken } = useBidToken()
  const { decimals, address } = useMetadataBySymbol(bidToken) || {
    decimals: 0,
    address: '',
  }
  const { amount } = useBalance(address)

  const setBidAmount = useCallback(
    async (bidAmount: string) => {
      // Validate
      const error = validateBidAmount(bidAmount, decimals, amount)
      setError(error)
      // Submit
      if (!error) dispatch(updateNewOrder({ bidAmount }))
    },
    [dispatch, decimals, amount],
  )

  const clear = useCallback(() => {
    setError('')
    dispatch(updateNewOrder({ bidAmount: '' }))
  }, [dispatch])

  return { bidAmount, setBidAmount, error, clear }
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
  const [error, setError] = useState('')
  const askAmount = useSelector(({ newOrder }: AppState) => newOrder.askAmount)

  const setAskAmount = useCallback(
    async (askAmount: string) => {
      // Validate
      const error = validateAskAmount(askAmount)
      setError(error)
      // Submit
      if (!error) dispatch(updateNewOrder({ askAmount }))
    },
    [dispatch],
  )

  const clear = useCallback(() => {
    setError('')
    dispatch(updateNewOrder({ askAmount: '' }))
  }, [dispatch])

  return { askAmount, setAskAmount, error, clear }
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
  const [error, setError] = useState('')
  const askPrice = useSelector(({ newOrder }: AppState) => newOrder.askPrice)

  const setAskPrice = useCallback(
    async (askPrice: string) => {
      // Validate
      const error = validateAskPrice(askPrice)
      setError(error)
      // Submit
      if (!error) dispatch(updateNewOrder({ askPrice }))
    },
    [dispatch],
  )

  const clear = useCallback(() => {
    setError('')
    dispatch(updateNewOrder({ askPrice: '' }))
  }, [dispatch])

  return { askPrice, setAskPrice, error, clear }
}
