import IconSax from '@sentre/antd-iconsax'
import { Avatar, Button, Col, Row, Space, Typography } from 'antd'
import InfoCard from './infoCard'

import configs from 'configs'
import { numeric } from 'helpers/util'
import { useAction } from 'hooks/useFilter'
import { useOrderSelector } from 'hooks/useOrder'

const {
  otc: {
    acceptedPayments: [sol, stable],
  },
} = configs

export type OfferCardProps = {
  address: string
}

const OfferCard = ({ address }: OfferCardProps) => {
  const [action] = useAction()

  const order = useOrderSelector((orders) => orders[address])
  console.log(order)

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
