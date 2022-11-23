import IconSax from '@sentre/antd-iconsax'
import { Avatar, Button, Col, Row, Space, Typography } from 'antd'

import { ACCEPTED_PAYMENTS } from 'helpers/acceptedPayments'
import { numeric } from 'helpers/util'
import { useAction } from 'hooks/useFilter'
import InfoCard from './infoCard'

const sol = ACCEPTED_PAYMENTS[0]
const stable = ACCEPTED_PAYMENTS[1]

const OfferCard = () => {
  const [action] = useAction()

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Offer Price</Typography.Text>
          <Space>
            <Avatar src={stable.url} size={40} />
            <Space direction="vertical" size={0}>
              <Typography.Title level={4}>
                {numeric(12.129512).format('0,0.[000]')}
              </Typography.Title>
              <Typography.Text type="secondary">
                {stable.symbol}/{sol.symbol}
              </Typography.Text>
            </Space>
          </Space>
        </Space>
      </Col>
      <Col span={12} style={{ textAlign: 'end' }}>
        <Space direction="vertical">
          <Space>
            <Typography.Text type="secondary">Offer ID: 1234</Typography.Text>
            <Button
              type="text"
              size="small"
              shape="circle"
              icon={<IconSax name="ExportCircle" />}
            />
          </Space>
          <Button type="primary" size="large" shape="round">
            <Space style={{ position: 'relative', top: -3 }}>
              <Avatar src={sol.url} size={24} />
              <Typography.Title level={5} style={{ color: '#ffffff' }}>
                {action} {sol.symbol}
              </Typography.Title>
            </Space>
          </Button>
        </Space>
      </Col>
      <Col xs={24}>
        <InfoCard />
      </Col>
    </Row>
  )
}

export default OfferCard
