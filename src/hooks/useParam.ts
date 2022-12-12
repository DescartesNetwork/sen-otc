import { useLocation, useParams } from 'react-router-dom'

/**
 * Parse query params
 * @param key
 * @returns
 */
export const useQueryParam = <T extends string>(key: string) => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const value = params.get(key)
  return value as T
}

/**
 * Parse route params
 * @param key
 * @returns
 */
export const useRouteParam = (key: string) => {
  const { [key]: value } = useParams()
  return value
}
