import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'store'
import { updateNewOrder } from 'store/newOrder.reducer'

export const useMode = () => {
  const dispatch = useDispatch<AppDispatch>()
  const mode = useSelector(({ newOrder }: AppState) => newOrder.mode)

  const setMode = useCallback(
    async (mode: OtcMode) => {
      return dispatch(updateNewOrder({ mode }))
    },
    [dispatch],
  )

  return [mode, setMode] as [typeof mode, typeof setMode]
}

export const useStartedAt = () => {
  const dispatch = useDispatch<AppDispatch>()
  const startedAt = useSelector(({ newOrder }: AppState) => newOrder.startedAt)

  const setStartedAt = useCallback(
    async (startedAt: string) => {
      return dispatch(updateNewOrder({ startedAt }))
    },
    [dispatch],
  )

  return [startedAt, setStartedAt] as [typeof startedAt, typeof setStartedAt]
}

export const useEndedAt = () => {
  const dispatch = useDispatch<AppDispatch>()
  const endedAt = useSelector(({ newOrder }: AppState) => newOrder.endedAt)

  const setEndedAt = useCallback(
    async (endedAt: string) => {
      return dispatch(updateNewOrder({ endedAt }))
    },
    [dispatch],
  )

  return [endedAt, setEndedAt] as [typeof endedAt, typeof setEndedAt]
}
