import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'store'
import { updateNewOrder } from 'store/newOrder.reducer'

/**
 * Mode
 * @returns
 */
export const useMode = () => {
  const dispatch = useDispatch<AppDispatch>()
  const mode = useSelector(({ newOrder }: AppState) => newOrder.mode)

  const setMode = useCallback(
    async (mode: OtcMode) => {
      return dispatch(
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

  return { mode, setMode }
}

/**
 * Started at
 * @returns
 */
export const useStartedAt = () => {
  const dispatch = useDispatch<AppDispatch>()
  const startedAt = useSelector(({ newOrder }: AppState) => newOrder.startedAt)

  const setStartedAt = useCallback(
    async (startedAt: string) => {
      return dispatch(updateNewOrder({ startedAt }))
    },
    [dispatch],
  )

  return { startedAt, setStartedAt }
}

/**
 * Ended at
 * @returns
 */
export const useEndedAt = () => {
  const dispatch = useDispatch<AppDispatch>()
  const endedAt = useSelector(({ newOrder }: AppState) => newOrder.endedAt)

  const setEndedAt = useCallback(
    async (endedAt: string) => {
      return dispatch(updateNewOrder({ endedAt }))
    },
    [dispatch],
  )

  return { endedAt, setEndedAt }
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
export const useBidAmount = () => {
  const dispatch = useDispatch<AppDispatch>()
  const bidAmount = useSelector(({ newOrder }: AppState) => newOrder.bidAmount)

  const setBidAmount = useCallback(
    async (bidAmount: string) => {
      return dispatch(updateNewOrder({ bidAmount }))
    },
    [dispatch],
  )

  return { bidAmount, setBidAmount }
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
export const useAskAmount = () => {
  const dispatch = useDispatch<AppDispatch>()
  const askAmount = useSelector(({ newOrder }: AppState) => newOrder.askAmount)

  const setAskAmount = useCallback(
    async (askAmount: string) => {
      return dispatch(updateNewOrder({ askAmount }))
    },
    [dispatch],
  )

  return { askAmount, setAskAmount }
}

/**
 * Ask price state
 * @returns
 */
export const useAskPrice = () => {
  const dispatch = useDispatch<AppDispatch>()
  const askPrice = useSelector(({ newOrder }: AppState) => newOrder.askPrice)

  const setAskPrice = useCallback(
    async (askPrice: string) => {
      return dispatch(updateNewOrder({ askPrice }))
    },
    [dispatch],
  )

  return { askPrice, setAskPrice }
}
