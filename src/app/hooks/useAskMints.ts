import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { useSortedMint } from './useSortedMint'

export const useAskMints = (): { askMints: string[] } => {
  const [askMints, setAskMints] = useState<string[]>([])
  const {
    retailers,
    order: { bidMintAddress },
  } = useSelector((state: AppState) => state)
  const { sortedMints } = useSortedMint(askMints)

  // Get all 'mint_ask' in list retailers data
  const getAskMints = useCallback(() => {
    const mapAskMints: Record<string, boolean> = {}
    for (const addr in retailers) {
      const { mint_ask, mint_bid } = retailers[addr]
      if (mint_bid === bidMintAddress) mapAskMints[mint_ask] = true
    }
    return setAskMints(Object.keys(mapAskMints))
  }, [bidMintAddress, retailers])

  useEffect(() => {
    getAskMints()
  }, [getAskMints])

  return { askMints: sortedMints }
}
