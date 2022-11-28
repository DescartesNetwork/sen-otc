import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'store'
import {
  setAction,
  setKeyword,
  setOfferedToken,
  setPaymentMethod,
  setSort,
  SortedBy,
} from 'store/filter.reducer'

/**
 * Action
 * @returns
 */
export const useAction = () => {
  const dispatch = useDispatch<AppDispatch>()
  const action = useSelector(({ filter }: AppState) => filter.action)
  const onAction = useCallback(
    (value: OtcMode) => dispatch(setAction(value)),
    [dispatch],
  )
  return { action, setAction: onAction }
}

/**
 * Payment method
 * @returns
 */
export const usePaymentMethod = () => {
  const dispatch = useDispatch<AppDispatch>()
  const paymentMethod = useSelector(
    ({ filter }: AppState) => filter.paymentMethod,
  )
  const onPaymentMethod = useCallback(
    (value: string) => dispatch(setPaymentMethod(value)),
    [dispatch],
  )
  return { paymentMethod, setPaymentMethod: onPaymentMethod }
}

/**
 * Offered token
 * @returns
 */
export const useOfferedToken = () => {
  const dispatch = useDispatch<AppDispatch>()
  const offeredToken = useSelector(
    ({ filter }: AppState) => filter.offeredToken,
  )
  const onOfferedToken = useCallback(
    (value: string) => dispatch(setOfferedToken(value)),
    [dispatch],
  )
  return { offeredToken, setOfferedToken: onOfferedToken }
}

/**
 * Keyword
 * @returns
 */
export const useKeyword = () => {
  const dispatch = useDispatch<AppDispatch>()
  const keyword = useSelector(({ filter }: AppState) => filter.keyword)
  const onKeyword = useCallback(
    (value: string) => dispatch(setKeyword(value)),
    [dispatch],
  )
  return { keyword, setKeyword: onKeyword }
}

/**
 * Sort
 * @returns
 */
export const useSort = () => {
  const dispatch = useDispatch<AppDispatch>()
  const sort = useSelector(({ filter }: AppState) => filter.sort)
  const onSort = useCallback(
    (value: SortedBy) => dispatch(setSort(value)),
    [dispatch],
  )
  return { sort, setSort: onSort }
}
