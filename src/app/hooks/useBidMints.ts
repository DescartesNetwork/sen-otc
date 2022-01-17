import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { useSortedMint } from './useSortedMint'
import { useMint } from '@senhub/providers'

export const useBidMints = () => {
  const { retailers } = useSelector((state: AppState) => state)
  const [bidMints, setBidMints] = useState<string[]>([])
  const { sortedMints } = useSortedMint(bidMints)
  const { tokenProvider } = useMint()

  // Get all 'mint_bid' in list retailers data
  const getBidMints = useCallback(async () => {
    const mapHasMints = new Map<string, boolean>()
    const newBidMints = []
    for (const addr in retailers) {
      const { mint_bid } = retailers[addr]
      const tokenInfo = await tokenProvider.findByAddress(mint_bid)
      if (mapHasMints.has(mint_bid) || !tokenInfo) continue
      newBidMints.push(mint_bid)
      mapHasMints.set(mint_bid, true)
    }
    return setBidMints(newBidMints)
  }, [retailers, tokenProvider])

  useEffect(() => {
    getBidMints()
  }, [getBidMints])

  return { bidMints: sortedMints }
}
