import { useState } from 'react'

import { Col, Row, Space, Typography } from 'antd'
import TokenSelect from 'app/components/selectTokens'
import NumericInput from 'shared/antd/numericInput'

import { useAskTokens } from 'app/hooks/useAskTokens'

const Ask = () => {
  const [askToken, setAskToken] = useState('')
  const [askAmount, setAskAmount] = useState('0')
  const { askTokens } = useAskTokens()

  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Typography.Text className="caption">To</Typography.Text>
      </Col>
      <Col span={24}>
        <NumericInput
          size="large"
          prefix={
            <TokenSelect
              value={askToken}
              tokens={askTokens}
              onChange={setAskToken}
            />
          }
          value={askAmount}
          onValue={setAskAmount}
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

export default Ask
