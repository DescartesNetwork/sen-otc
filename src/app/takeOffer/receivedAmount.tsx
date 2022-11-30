import { useEffect, useState } from 'react'

import { Col, Input, Row, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'
import TreasuryBalance from 'components/treasuryBalance'

import configs from 'configs'
import { useReceivedAmount, useReceivedToken } from 'hooks/useTakeOrder'
import { useRouteParam } from 'hooks/useQueryParam'

const {
  otc: { acceptedPayments },
} = configs

const ReceivedAmount = () => {
  const [value, setValue] = useState('')
  const orderAddress = useRouteParam('orderAddress') || ''
  const { receivedAmount, receivedAmountError } = useReceivedAmount()
  const receivedToken = useReceivedToken()

  useEffect(() => {
    setValue(receivedAmount)
  }, [receivedAmount])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false} align="bottom">
          <Col flex="auto">
            <Typography.Text type="secondary">RECEIVE</Typography.Text>
          </Col>
          <Col>
            <TreasuryBalance type="a" orderAddress={orderAddress} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="top" wrap={false}>
          <Col>
            <TokenSelection
              options={acceptedPayments}
              value={receivedToken?.symbol}
              disabled
            />
          </Col>
          <Col flex="auto">
            <Row gutter={[0, 0]} justify="end">
              <Col span={24}>
                <Input
                  size="large"
                  placeholder={`Amount of ${receivedToken?.symbol}`}
                  value={value}
                  readOnly
                />
              </Col>
              {receivedAmountError && (
                <Col>
                  <Typography.Text type="danger">
                    {receivedAmountError}
                  </Typography.Text>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ReceivedAmount
