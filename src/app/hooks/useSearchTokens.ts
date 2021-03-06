import { useCallback, useEffect, useState } from 'react'
import { useMint } from '@senhub/providers'

const KEYSIZE = 3

export const useSearchTokens = (tokens: string[], keyword: string) => {
  const [searchedTokens, setSearchedTokens] = useState<string[]>(tokens)
  const { tokenProvider } = useMint()

  const onSearch = useCallback(
    async (keyword: string) => {
      if (!keyword || keyword.length < KEYSIZE) return setSearchedTokens(tokens)
      const raw = await tokenProvider.find(keyword)
      const searchedTokenAddress = raw.map(({ address }) => address)
      let searchedToken: string[] = []
      // Filter Tokens
      searchedToken = tokens.filter((token) =>
        searchedTokenAddress.includes(token),
      )
      return setSearchedTokens(searchedToken)
    },
    [tokenProvider, tokens],
  )

  useEffect(() => {
    onSearch(keyword)
  }, [onSearch, keyword])

  return searchedTokens
}
