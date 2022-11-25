import { Avatar, Card, Col, Row, Space, Typography } from 'antd'

import configs from 'configs'
import { numeric } from 'helpers/util'

const {
  otc: {
    acceptedPayments: [sol],
  },
} = configs

const BalanceCard = () => {
  return (
    <Card style={{ height: '100%' }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Text type="secondary">Available</Typography.Text>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Title level={5}>
              {numeric(6000).format('0,0.[000]')}
            </Typography.Title>
            <Avatar src={sol.url} size={24} />
            <Typography.Title type="secondary" level={5}>
              {sol.symbol}
            </Typography.Title>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary">-</Typography.Paragraph>
          <Typography.Link>View it on Solscan</Typography.Link>
        </Col>
      </Row>
    </Card>
  )
}

export default BalanceCard
