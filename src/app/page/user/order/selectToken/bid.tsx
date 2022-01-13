import { useState } from 'react'

import { Col, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import TokenSelect from 'app/components/selectTokens'

import { useBidTokens } from 'app/hooks/useBidTokens'

const Bid = () => {
  const [bidToken, setBidToken] = useState('')
  const [bidAmount, setBidAmount] = useState('0')
  const { bidTokens } = useBidTokens()
  console.log('bidTokens', bidTokens)
  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Typography.Text className="caption">From</Typography.Text>
      </Col>
      <Col span={24}>
        <NumericInput
          size="large"
          prefix={
            <TokenSelect
              value={bidToken}
              tokens={bidTokens}
              onChange={setBidToken}
            />
          }
          value={bidAmount}
          onValue={setBidAmount}
        />
      </Col>
      <Col>
        <Space size={4}>
          <Typography.Text type="secondary" className="caption">
            Available:
          </Typography.Text>
          <Typography.Text type="secondary" className="caption">
            123
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Bid
