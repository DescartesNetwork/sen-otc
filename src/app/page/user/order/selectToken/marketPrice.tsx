import { Typography } from 'antd'
import { useMintPrice } from 'app/hooks/useMintPrice'
import { AppState } from 'app/model'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MintSymbol } from 'shared/antd/mint'
import { numeric } from 'shared/util'

const MarketPrice = () => {
  const {
    order: { bidMintAddress, askMintAddress },
  } = useSelector((state: AppState) => state)

  const bidMintPrice = useMintPrice(bidMintAddress)
  const askMintPrice = useMintPrice(askMintAddress)

  const askPerBid = useMemo(() => {
    if (!bidMintPrice || !askMintPrice) return 0
    return bidMintPrice / askMintPrice
  }, [askMintPrice, bidMintPrice])

  return (
    <Typography.Text type="secondary">
      Market price: 1 <MintSymbol mintAddress={bidMintAddress} /> ={' '}
      {numeric(askPerBid).format('0,0.[00]')}{' '}
      <MintSymbol mintAddress={askMintAddress} />
    </Typography.Text>
  )
}

export default MarketPrice
