import IconSax from '@sentre/antd-iconsax'
import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd'

const InterestCard = () => {
  return (
    <Card style={{ height: '100%' }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Text type="secondary">Save</Typography.Text>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Title style={{ color: '#1A63FF' }} level={5}>
              3%
            </Typography.Title>
            <Tooltip title="Compared to the reference market price on CoinGecko.">
              <Button
                type="text"
                size="small"
                shape="circle"
                icon={<IconSax name="Information" />}
              />
            </Tooltip>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary">-</Typography.Paragraph>
          <Typography.Link>View the price on CoinGecko</Typography.Link>
        </Col>
      </Row>
    </Card>
  )
}

export default InterestCard
