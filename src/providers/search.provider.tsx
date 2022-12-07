import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

export type SearchContext = {
  keyword: string
  setKeyword: (keyword: string) => void
}

/**
 * Context
 */
const Context = createContext<SearchContext>({
  keyword: '',
  setKeyword: () => {},
})

/**
 * Provider
 */
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [keyword, setKeyword] = useState('')
  const value = useMemo(() => ({ keyword, setKeyword }), [keyword])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useSearch = () => {
  return useContext<SearchContext>(Context)
}
