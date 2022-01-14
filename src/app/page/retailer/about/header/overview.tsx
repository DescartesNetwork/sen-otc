import { Col, Row, Space, Typography } from 'antd'

const Overview = () => {
  return (
    <Row gutter={24}>
      <Col>
        <Space direction="vertical">
          <Typography.Text className="text-secondary">Rate</Typography.Text>
          <Typography.Title className="text-title" level={5}>
            98.01%
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text className="text-secondary">
            Approved order
          </Typography.Text>
          <Typography.Title className="text-title" level={5}>
            98.01%
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text className="text-secondary">
            Reject order
          </Typography.Text>
          <Typography.Title className="text-title" level={5}>
            98.01%
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text className="text-secondary">
            Usable pair
          </Typography.Text>
          <Typography.Title className="text-title" level={5}>
            98.01%
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text className="text-secondary">
            Created pair
          </Typography.Text>
          <Typography.Title className="text-title" level={5}>
            98.01%
          </Typography.Title>
        </Space>
      </Col>
    </Row>
  )
}

export default Overview
