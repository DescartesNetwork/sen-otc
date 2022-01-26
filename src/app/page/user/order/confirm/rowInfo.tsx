import { Col, Row, Typography } from 'antd'

const RowInfo = ({
  label = '',
  value = '',
}: {
  label?: string
  value?: string | number
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>{value}</Typography.Text>
      </Col>
    </Row>
  )
}

export default RowInfo
