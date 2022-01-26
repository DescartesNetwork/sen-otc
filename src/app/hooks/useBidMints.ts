import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { useSortedMint } from './useSortedMint'

export const useBidMints = () => {
  const [bidMints, setBidMints] = useState<string[]>([])
  const { retailers } = useSelector((state: AppState) => state)
  const { sortedMints } = useSortedMint(bidMints)

  // Get all 'mint_bid' in list retailers data
  const getBidMints = useCallback(async () => {
    const mapMints: Record<string, boolean> = {}
    for (const addr in retailers) {
      const { mint_bid } = retailers[addr]
      mapMints[mint_bid] = true
    }
    return setBidMints(Object.keys(mapMints))
  }, [retailers])

  useEffect(() => {
    getBidMints()
  }, [getBidMints])

  return { bidMints: sortedMints }
}
