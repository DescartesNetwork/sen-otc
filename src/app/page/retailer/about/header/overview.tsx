import { Col, Row, Space, Typography } from 'antd'

const Overview = () => {
  return (
    <Row gutter={24}>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Rate</Typography.Text>
          <Typography.Title level={5}>98.01%</Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Approved order</Typography.Text>
          <Typography.Title level={5}>98.01%</Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Reject order</Typography.Text>
          <Typography.Title level={5}>98.01%</Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Usable pair</Typography.Text>
          <Typography.Title level={5}>98.01%</Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Created pair</Typography.Text>
          <Typography.Title level={5}>98.01%</Typography.Title>
        </Space>
      </Col>
    </Row>
  )
}

export default Overview
