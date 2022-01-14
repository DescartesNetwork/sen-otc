import { useCallback, useEffect, useState } from 'react'
import { usePool, useMint } from '@senhub/providers'

export const useSortedMint = (rawMintAddresses: string[]) => {
  const [sortedMints, setSortedMints] = useState<string[]>([])
  const { tokenProvider } = useMint()
  const { pools } = usePool()

  const sortMintAddresses = useCallback(async () => {
    // Get all lp mints
    const lpMintAddresses = Object.values(pools).map(({ mint_lpt }) => mint_lpt)
    // Check mint addresses (token info, mint lp)
    const checkedMintAddresses = await Promise.all(
      rawMintAddresses.map(async (mintAddress) => {
        const tokenInfo = await tokenProvider.findByAddress(mintAddress)
        const data = {
          address: mintAddress,
          checked: Boolean(tokenInfo) || lpMintAddresses.includes(mintAddress),
        }
        return data
      }),
    )
    // Sort mint addresses by checking flags
    const sortedMintAddresses = checkedMintAddresses
      .sort((first, second) => {
        if (!first.checked && second.checked) return 1
        if (first.checked && !second.checked) return -1
        return 0
      })
      .map(({ address }) => address)
    // Return
    return setSortedMints(sortedMintAddresses)
  }, [pools, rawMintAddresses, tokenProvider])

  useEffect(() => {
    sortMintAddresses()
  }, [sortMintAddresses])

  return { sortedMints }
}
