import { AppState } from 'app/model'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useAskTokens = () => {
  const { retailers } = useSelector((state: AppState) => state)
  const [askTokens, setAskTokens] = useState<string[]>([])

  // Get all 'mint_ask' in list retailers data
  const getAskTokens = useCallback(() => {
    const mapHasTokens = new Map<string, boolean>()
    const newAskTokens = []
    for (const addr in retailers) {
      const { mint_ask } = retailers[addr]
      if (mapHasTokens.has(mint_ask)) continue
      newAskTokens.push(mint_ask)
      mapHasTokens.set(mint_ask, true)
    }
    return setAskTokens(newAskTokens)
  }, [retailers])

  useEffect(() => {
    getAskTokens()
  }, [getAskTokens])

  return { askTokens }
}
