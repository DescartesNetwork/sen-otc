import { Col, DatePicker, Row, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Ask from './ask'
import Bid from './bid'

const CreateOffer = () => {
  return (
    <MaxWidthLayout level={3}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={2}>Create an Offer</Typography.Title>
        </Col>
        <Col span={24}>
          <Bid />
        </Col>
        <Col span={24}>
          <Ask />
        </Col>
        <Col span={12}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">STARTED AT</Typography.Text>
            </Col>
            <Col span={24}>
              <DatePicker size="large" style={{ width: '100%' }} />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">ENDED AT</Typography.Text>
            </Col>
            <Col span={24}>
              <DatePicker size="large" style={{ width: '100%' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default CreateOffer
