import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useMintPrice } from 'app/hooks/useMintPrice'
import { AppState } from 'app/model'

export const useMarketPrice = () => {
  const {
    order: { bidMintAddress, askMintAddress },
  } = useSelector((state: AppState) => state)

  const bidMintPrice = useMintPrice(bidMintAddress)
  const askMintPrice = useMintPrice(askMintAddress)

  const marketPrice = useMemo(() => {
    if (!bidMintPrice || !askMintPrice) return 0
    return bidMintPrice / askMintPrice
  }, [askMintPrice, bidMintPrice])

  return { marketPrice }
}
