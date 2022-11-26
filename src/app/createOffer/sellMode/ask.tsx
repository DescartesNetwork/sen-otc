import { useState } from 'react'

import { Col, Input, Row, Segmented, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'

import configs from 'configs'

const {
  otc: { acceptedPayments },
} = configs
const MODE = ['Price', 'Amount']

const Ask = () => {
  const [mode, setMode] = useState('Price')
  const [symbol, setSymbol] = useState('USDC')

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false} align="bottom">
          <Col flex="auto">
            <Typography.Text type="secondary">ASK</Typography.Text>
          </Col>
          <Col>
            <Segmented
              size="small"
              options={MODE.map((value) => ({
                label: (
                  <Typography.Text style={{ fontSize: 12 }}>
                    {`By ${value}`}
                  </Typography.Text>
                ),
                value,
              }))}
              value={mode}
              onChange={(e) => setMode(e.toString())}
            />
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
            <Input size="large" placeholder={`${mode} of ${symbol}`} />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ textAlign: 'end' }}>
        <Typography.Text type="secondary">Offered Price: $0</Typography.Text>
      </Col>
    </Row>
  )
}

export default Ask
