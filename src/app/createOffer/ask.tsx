import { useMemo, useState } from 'react'

import { Col, Input, Row, Typography } from 'antd'
import TokenSelection, { parseToken } from 'components/tokenSelect'

const Ask = () => {
  const [symbol, setSymbol] = useState('SOL')
  const token = useMemo(() => parseToken(symbol), [symbol])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">ASK</Typography.Text>
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
    </Row>
  )
}

export default Ask
