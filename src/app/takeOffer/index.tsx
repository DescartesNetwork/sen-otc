import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import PaidAmount from './paidAmount'
import ReceivedAmount from './receivedAmount'

import { useOrderMode, useOrderPartneredToken } from 'hooks/useOrder'
import { useRouteParam } from 'hooks/useQueryParam'

const TakeOffer = () => {
  const orderAddress = useRouteParam('orderAddress') || ''
  const navigate = useNavigate()
  const mode = useOrderMode(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)

  return (
    <MaxWidthLayout level={3}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Space>
            <Button
              size="large"
              type="text"
              icon={<IconSax name="ArrowLeft2" />}
              onClick={() => navigate('/home')}
              style={{ marginLeft: -8 }}
            />
            <Typography.Title level={2}>
              {mode} {partneredToken?.symbol}
            </Typography.Title>
          </Space>
        </Col>
        <Col span={24}>
          <PaidAmount />
        </Col>
        <Col span={24}>
          <ReceivedAmount />
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default TakeOffer
