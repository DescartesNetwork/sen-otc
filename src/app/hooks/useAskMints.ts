import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { useSortedMint } from './useSortedMint'

export const useAskMints = (): { askMints: string[] } => {
  const {
    retailers,
    order: { bidMintAddress },
  } = useSelector((state: AppState) => state)
  const [askMints, setAskMints] = useState<string[]>([])
  const { sortedMints } = useSortedMint(askMints)

  // Get all 'mint_ask' in list retailers data
  const getAskMints = useCallback(() => {
    const mapHasMints = new Map<string, boolean>()
    const newAskMints = []
    for (const addr in retailers) {
      const { mint_ask, mint_bid } = retailers[addr]
      if (mapHasMints.has(mint_ask) || mint_bid !== bidMintAddress) continue
      newAskMints.push(mint_ask)
      mapHasMints.set(mint_ask, true)
    }
    return setAskMints(newAskMints)
  }, [bidMintAddress, retailers])

  useEffect(() => {
    getAskMints()
  }, [getAskMints])

  return { askMints: sortedMints }
}
