import { useSelector } from 'react-redux'

import { Col, Row, Typography } from 'antd'
import { MintSymbol } from 'shared/antd/mint'

import { useMarketPrice } from 'app/hooks/useMarketPrice'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'

const MarketPrice = ({ floatRight = true }: { floatRight?: boolean }) => {
  const {
    order: { bidMintAddress, askMintAddress },
  } = useSelector((state: AppState) => state)
  const { marketPrice } = useMarketPrice(bidMintAddress, askMintAddress)
  const flex = floatRight ? 'auto' : undefined

  return (
    <Row gutter={[8, 8]}>
      <Col flex={flex}>
        <Typography.Text type="secondary">Market price:</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>
          1 <MintSymbol mintAddress={bidMintAddress} /> ={' '}
          {numeric(marketPrice).format('0,0.[00]')}{' '}
          <MintSymbol mintAddress={askMintAddress} />
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default MarketPrice
