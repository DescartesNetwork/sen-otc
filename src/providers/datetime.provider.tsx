import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import dayjs from 'dayjs'

export type DatetimeContext = {
  startedAt: string
  startedAtError: string
  setStartedAt: (startedAt: string) => void
  endedAt: string
  endedAtError: string
  setEndedAt: (endedAt: string) => void
}

/**
 * Context
 */
const Context = createContext<DatetimeContext>({
  startedAt: '',
  startedAtError: '',
  setStartedAt: () => {},
  endedAt: '',
  endedAtError: '',
  setEndedAt: () => {},
})

/**
 * Provider
 */
export const DatetimeProvider = ({ children }: { children: ReactNode }) => {
  const [startedAt, setStartedAt] = useState('')
  const [startedAtError, setStartedAtError] = useState('')
  const [endedAt, setEndedAt] = useState('')
  const [endedAtError, setEndedAtError] = useState('')

  const wrappedSetStartedAt = useCallback((startedAt: string) => {
    const startedAtError = validateStartedAt(startedAt)
    setStartedAtError(startedAtError)
    setStartedAt(startedAt)
  }, [])

  const wrappedSetEndedAt = useCallback(
    (endedAt: string) => {
      const endedAtError = validateEndedAt(startedAt, endedAt)
      setEndedAtError(endedAtError)
      setEndedAt(endedAt)
    },
    [startedAt],
  )

  const value = useMemo(
    () => ({
      startedAt,
      startedAtError,
      setStartedAt: wrappedSetStartedAt,
      endedAt,
      endedAtError,
      setEndedAt: wrappedSetEndedAt,
    }),
    [
      startedAt,
      startedAtError,
      wrappedSetStartedAt,
      endedAt,
      endedAtError,
      wrappedSetEndedAt,
    ],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useDatetime = () => {
  return useContext<DatetimeContext>(Context)
}

/**
 * Utility
 */
export const validateStartedAt = (startedAt: string) => {
  const start = Number(new Date(startedAt))
  if (!start) return 'The start date cannot be empty.'
  if (Date.now() - start > 60 * 60 * 1000)
    return 'The start date is too far in the past. It should be less than 1 hour to the current date.'
  if (start - Date.now() > 365 * 24 * 60 * 60 * 1000)
    return 'The start date is too far in the future. It should be less than 1 year from the current date.'
  return ''
}
export const validateEndedAt = (startedAt: string, endedAt: string) => {
  const start = Number(new Date(startedAt))
  const end = Number(new Date(endedAt))
  if (!start) return 'Please schedule the start date first.'
  if (!end) return 'The end date cannot be empty.'
  if (Date.now() > end) return 'The start date cannot be set in the past.'
  if (start >= end)
    return `The end date must be greater than the start date at ${dayjs(
      start,
    ).format('hh:mm:ss A, DD MMM YY')}.`
  return ''
}
