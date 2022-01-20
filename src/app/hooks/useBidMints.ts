import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMint } from '@senhub/providers'

import { AppState } from 'app/model'
import { useSortedMint } from './useSortedMint'

export const useBidMints = () => {
  const [bidMints, setBidMints] = useState<string[]>([])
  const { retailers } = useSelector((state: AppState) => state)
  const { sortedMints } = useSortedMint(bidMints)
  const { tokenProvider } = useMint()

  // Get all 'mint_bid' in list retailers data
  const getBidMints = useCallback(async () => {
    const mapMints: Record<string, boolean> = {}
    for (const addr in retailers) {
      const { mint_bid } = retailers[addr]
      const tokenInfo = await tokenProvider.findByAddress(mint_bid)
      if (tokenInfo) mapMints[mint_bid] = true
    }
    return setBidMints(Object.keys(mapMints))
  }, [retailers, tokenProvider])

  useEffect(() => {
    getBidMints()
  }, [getBidMints])

  return { bidMints: sortedMints }
}
