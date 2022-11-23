import { Col, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'

const History = () => {
  return (
    <MaxWidthLayout>
      <Row gutter={[24, 24]}>
        <Col span={24}>History</Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default History
