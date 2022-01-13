import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { useSortedMint } from './useSortedMint'

export const useBidMints = () => {
  const { retailers } = useSelector((state: AppState) => state)
  const [bidMints, setBidMints] = useState<string[]>([])
  const { sortedMints } = useSortedMint(bidMints)

  // Get all 'mint_bid' in list retailers data
  const getBidMints = useCallback(() => {
    const mapHasMints = new Map<string, boolean>()
    const newBidMints = []
    for (const addr in retailers) {
      const { mint_bid } = retailers[addr]
      if (mapHasMints.has(mint_bid)) continue
      newBidMints.push(mint_bid)
      mapHasMints.set(mint_bid, true)
    }
    return setBidMints(newBidMints)
  }, [retailers])

  useEffect(() => {
    getBidMints()
  }, [getBidMints])

  return { bidMints: sortedMints }
}
