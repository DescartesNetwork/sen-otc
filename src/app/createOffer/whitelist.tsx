import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography, Upload } from 'antd'

const Whitelist = () => {
  return (
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
              icon={<IconSax name="DocumentUpload" style={{ fontSize: 24 }} />}
            />
            <Space direction="vertical" size={0}>
              <Typography.Text>Click or Drag here to upload</Typography.Text>
              <Typography.Text type="secondary">
                Support CSV, TXT file
              </Typography.Text>
            </Space>
          </Space>
        </Upload.Dragger>
      </Col>
    </Row>
  )
}

export default Whitelist
