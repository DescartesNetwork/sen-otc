import { useState } from 'react'

import { Col, Input, Row, Segmented, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'

import configs from 'configs'

const {
  otc: { acceptedPayments },
} = configs

const Ask = () => {
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
              options={[
                {
                  label: (
                    <Typography.Text style={{ fontSize: 12 }} type="secondary">
                      By Price
                    </Typography.Text>
                  ),
                  value: 'Price',
                },
                {
                  label: (
                    <Typography.Text style={{ fontSize: 12 }}>
                      By Amount
                    </Typography.Text>
                  ),
                  value: 'Amount',
                },
              ]}
              value={'Amount'}
              disabled
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
            <Input size="large" placeholder={`Amount of ${symbol}`} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Ask
