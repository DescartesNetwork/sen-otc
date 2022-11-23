import { Col, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'

const MyOffer = () => {
  return (
    <MaxWidthLayout>
      <Row gutter={[24, 24]}>
        <Col span={24}>My Offer</Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default MyOffer
