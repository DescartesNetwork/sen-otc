import { useSelector } from 'react-redux'

import { Typography } from 'antd'
import { MintSymbol } from 'shared/antd/mint'

import { useMarketPrice } from 'app/hooks/useMarketPrice'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'

const MarketPrice = () => {
  const {
    order: { bidMintAddress, askMintAddress },
  } = useSelector((state: AppState) => state)
  const { marketPrice } = useMarketPrice()

  return (
    <Typography.Text type="secondary">
      Market price: 1 <MintSymbol mintAddress={bidMintAddress} /> ={' '}
      {numeric(marketPrice).format('0,0.[00]')}{' '}
      <MintSymbol mintAddress={askMintAddress} />
    </Typography.Text>
  )
}

export default MarketPrice
