import { AppState } from 'app/model'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useAskMints = (): { askMints: string[] } => {
  const { retailers } = useSelector((state: AppState) => state)
  const [askMints, setAskMints] = useState<string[]>([])

  // Get all 'mint_ask' in list retailers data
  const getAskMints = useCallback(() => {
    const mapHasMints = new Map<string, boolean>()
    const newAskMints = []
    for (const addr in retailers) {
      const { mint_ask } = retailers[addr]
      if (mapHasMints.has(mint_ask)) continue
      newAskMints.push(mint_ask)
      mapHasMints.set(mint_ask, true)
    }
    return setAskMints(newAskMints)
  }, [retailers])

  useEffect(() => {
    getAskMints()
  }, [getAskMints])

  return { askMints }
}
