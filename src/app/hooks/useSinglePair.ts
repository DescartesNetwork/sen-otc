import { useMint } from '@senhub/providers'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'

export const useSinglePairs = (retailerAdrresses: string[]) => {
  const { tokenProvider } = useMint()
  const [singleMints, setSingleMints] = useState<string[]>([])
  const { retailers } = useSelector((state: AppState) => state)

  const filterSingleMints = useCallback(async () => {
    const newSingleMints: string[] = []
    for (const mintAddr of retailerAdrresses) {
      const { mint_ask, mint_bid } = retailers[mintAddr]
      const tokenFromAsk = await tokenProvider.findByAddress(mint_ask)
      const tokenFromBid = await tokenProvider.findByAddress(mint_bid)

      if (tokenFromAsk && tokenFromBid) newSingleMints.push(mintAddr)
    }
    return setSingleMints(newSingleMints)
  }, [retailerAdrresses, retailers, tokenProvider])

  useEffect(() => {
    filterSingleMints()
  }, [filterSingleMints])

  return singleMints
}
