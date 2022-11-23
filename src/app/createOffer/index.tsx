import IconSax from '@sentre/antd-iconsax'
import { Button, Col, DatePicker, Row, Space, Typography, Upload } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Ask from './ask'
import Bid from './bid'

const CreateOffer = () => {
  return (
    <MaxWidthLayout level={3}>
      <Row gutter={[12, 24]}>
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
              <DatePicker size="large" style={{ width: '100%' }} showTime />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">ENDED AT</Typography.Text>
            </Col>
            <Col span={24}>
              <DatePicker size="large" style={{ width: '100%' }} showTime />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">
                WHITELIST ADDRESS (OPTIONAL)
              </Typography.Text>
            </Col>
            <Col span={24}>
              <Upload.Dragger>
                <Space direction="vertical" size={16}>
                  <Button
                    type="link"
                    icon={
                      <IconSax name="DocumentUpload" style={{ fontSize: 24 }} />
                    }
                  />
                  <Space direction="vertical" size={0}>
                    <Typography.Text>
                      Click or Drag here to upload
                    </Typography.Text>
                    <Typography.Text type="secondary">
                      Support CSV, TXT file
                    </Typography.Text>
                  </Space>
                </Space>
              </Upload.Dragger>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Button size="large" shape="round" block>
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button type="primary" size="large" shape="round" block>
            Create
          </Button>
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default CreateOffer
