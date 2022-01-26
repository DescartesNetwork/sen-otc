import { useMemo } from 'react'

import { useMintPrice } from 'app/hooks/useMintPrice'

export const useMarketPrice = (
  bidMintAddress: string,
  askMintAddress: string,
) => {
  const bidMintPrice = useMintPrice(bidMintAddress)
  const askMintPrice = useMintPrice(askMintAddress)

  const marketPrice = useMemo(() => {
    if (!bidMintPrice || !askMintPrice) return 0
    return bidMintPrice / askMintPrice
  }, [askMintPrice, bidMintPrice])

  return { marketPrice }
}
