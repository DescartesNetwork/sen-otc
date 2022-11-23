import { useMemo, useState } from 'react'

import { Col, Input, Row, Typography } from 'antd'
import TokenSelection, { parseToken } from 'components/tokenSelect'

import { numeric } from 'helpers/util'

const Bid = () => {
  const [symbol, setSymbol] = useState('USDC')
  const token = useMemo(() => parseToken(symbol), [symbol])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false}>
          <Col flex="auto">
            <Typography.Text type="secondary">BID</Typography.Text>
          </Col>
          <Col>
            <Typography.Text type="secondary">
              Balance: {numeric(1928639824).format('0,0.[000]')} {symbol}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="middle">
          <Col>
            <TokenSelection symbol={symbol} onSymbol={setSymbol} />
          </Col>
          <Col flex="auto">
            <Input size="large" placeholder={`Amount of ${token?.symbol}`} />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ textAlign: 'end' }}>
        <Typography.Text type="secondary">Reference Price: $0</Typography.Text>
      </Col>
    </Row>
  )
}

export default Bid
