import { Col, Row, Space, Typography } from 'antd'

const Price = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Title level={1}>$0</Typography.Title>
          <Typography.Text type="secondary">Reference Price</Typography.Text>
        </Space>
      </Col>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Title level={1}>$0</Typography.Title>
          <Typography.Text type="secondary">Offered Price</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Price
