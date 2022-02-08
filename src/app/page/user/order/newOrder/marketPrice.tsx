import { useSelector } from 'react-redux'

import { Space, Typography } from 'antd'
import { MintSymbol } from 'shared/antd/mint'

import { useMarketPrice } from 'app/hooks/useMarketPrice'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'

const MarketPrice = () => {
  const {
    order: { bidMintAddress, askMintAddress },
  } = useSelector((state: AppState) => state)
  const { marketPrice } = useMarketPrice(bidMintAddress, askMintAddress)

  return (
    <Space size={4}>
      <Typography.Text type="secondary">Market price:</Typography.Text>
      <Typography.Text>
        1 <MintSymbol mintAddress={bidMintAddress} /> ={' '}
        {numeric(marketPrice).format('0,0.[00]')}{' '}
        <MintSymbol mintAddress={askMintAddress} />
      </Typography.Text>
    </Space>
  )
}

export default MarketPrice
