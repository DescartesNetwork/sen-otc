import { Col, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'

const CreateOffer = () => {
  return (
    <MaxWidthLayout>
      <MaxWidthLayout>
        <Row gutter={[24, 24]}>
          <Col span={24}>Create Offer</Col>
        </Row>
      </MaxWidthLayout>
    </MaxWidthLayout>
  )
}

export default CreateOffer
