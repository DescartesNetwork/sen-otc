import { Card, Col, Row, Typography } from 'antd'
import { numeric } from 'helpers/util'

import {
  useOfferedPrice,
  useOrderPartneredToken,
  useOrderPaymentMethod,
} from 'hooks/useOrder'
import { useRouteParam } from 'hooks/useQueryParam'
import { useReceivedAmount, useReceivedToken } from 'hooks/useTakeOrder'
import { useMemo } from 'react'

const Stat = () => {
  const orderAddress = useRouteParam('orderAddress') || ''
  const offeredPrice = useOfferedPrice(orderAddress)
  const paymentMethod = useOrderPaymentMethod(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)
  const receivedToken = useReceivedToken()
  const { receivedAmount, receivedAmountError } = useReceivedAmount()

  const actualReceivedAmount = useMemo(() => {
    if (receivedAmountError || !receivedAmount) return '--'
    return numeric(Number(receivedAmount) * 0.98).format('0,0.[000000]')
  }, [receivedAmount, receivedAmountError])

  return (
    <Card>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row gutter={[12, 12]} wrap={false}>
            <Col flex="auto">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Rate
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text>
                {`${numeric(1 / offeredPrice).format('0,0.[000000]')} ${
                  partneredToken?.symbol
                } = 1 ${paymentMethod?.symbol}`}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]} wrap={false}>
            <Col flex="auto">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Protocol fees
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text>2%</Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]} wrap={false}>
            <Col flex="auto">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                You will receive
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text>
                {actualReceivedAmount} {receivedToken?.symbol}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default Stat
