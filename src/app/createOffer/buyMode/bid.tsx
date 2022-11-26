import { useState } from 'react'

import { Col, Input, Row, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'
import TokenBalance from '../balance'

import configs from 'configs'
import { useMetadataBySymbol } from 'hooks/useToken'

const {
  otc: { acceptedPayments },
} = configs

const Bid = () => {
  const [symbol, setSymbol] = useState('USDC')
  const { address } = useMetadataBySymbol(symbol) || {}

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col flex="auto">
            <Typography.Text type="secondary">BID</Typography.Text>
          </Col>
          <Col>
            <TokenBalance mintAddress={address || ''} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="middle">
          <Col>
            <TokenSelection
              options={acceptedPayments}
              value={symbol}
              onChange={setSymbol}
            />
          </Col>
          <Col flex="auto">
            <Input size="large" placeholder={`Amount of ${symbol}`} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Bid
