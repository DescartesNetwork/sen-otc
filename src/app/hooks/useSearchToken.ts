import { useCallback, useEffect, useState } from 'react'
import { useMint } from '@senhub/providers'

const KEYSIZE = 3

export const useSearchToken = (tokens: string[], keyword: string) => {
  const [searchedAccount, setSearchedAccount] = useState<string[]>()

  const { tokenProvider } = useMint()

  const onSearch = useCallback(
    async (keyword: string | undefined) => {
      if (!keyword || keyword.length < KEYSIZE)
        return setSearchedAccount(undefined)
      const raw = await tokenProvider.find(keyword)
      const searchedTokenAddress = raw.map(({ address }) => address)
      let searchedAccount: string[] = []
      // Filter Tokens
      tokens.forEach((accAddr) => {
        if (!searchedTokenAddress.includes(accAddr)) return
        return searchedAccount.push(accAddr)
      })
      return setSearchedAccount(searchedAccount)
    },
    [tokenProvider, tokens],
  )

  useEffect(() => {
    onSearch(keyword)
  }, [onSearch, keyword])

  return {
    searchedAccount,
  }
}
