import { Row, Col, Typography } from 'antd'

const Widget = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Text>Widget</Typography.Text>
      </Col>
    </Row>
  )
}

export default Widget
