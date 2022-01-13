import { AppState } from 'app/model'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useBidTokens = () => {
  const { retailers } = useSelector((state: AppState) => state)
  const [bidTokens, setBidTokens] = useState<string[]>([])

  console.log('retailers', retailers)
  // Get all 'mint_bid' in list retailers data
  const getBidTokens = useCallback(() => {
    const mapHasTokens = new Map<string, boolean>()
    const newBidTokens = []
    for (const addr in retailers) {
      const { mint_bid } = retailers[addr]
      if (mapHasTokens.has(mint_bid)) continue
      newBidTokens.push(mint_bid)
      mapHasTokens.set(mint_bid, true)
    }
    return setBidTokens(newBidTokens)
  }, [retailers])

  useEffect(() => {
    getBidTokens()
  }, [getBidTokens])

  return { bidTokens }
}
