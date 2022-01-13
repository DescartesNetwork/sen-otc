import { AppState } from 'app/model'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useBidMints = () => {
  const { retailers } = useSelector((state: AppState) => state)
  const [bidMints, setBidMints] = useState<string[]>([])

  console.log('retailers', retailers)
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

  return { bidMints }
}
