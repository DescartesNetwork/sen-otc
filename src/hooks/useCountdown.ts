import { useCallback, useEffect, useState } from 'react'

/**
 * A timer-in-sencond countdown which allows to refresh without circular dependency problems.
 * @param seconds
 * @returns
 */
export const useCountdown = (seconds: number) => {
  const [refreshing, setRefreshing] = useState(false)
  const [counter, setCounter] = useState(seconds)

  useEffect(() => {
    if (refreshing) {
      setCounter(seconds)
      return setRefreshing(false)
    }
    const id = setInterval(() => {
      return setCounter((prev) => {
        if (prev > 0) return --prev
        clearInterval(id)
        return prev
      })
    }, 1000)
    return () => clearInterval(id)
  }, [refreshing, seconds])

  const refresh = useCallback(() => setRefreshing(true), [])

  return [counter, refresh] as [typeof counter, typeof refresh]
}
