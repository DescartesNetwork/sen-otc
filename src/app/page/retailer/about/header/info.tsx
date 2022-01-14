import { Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Tier from 'app/components/tier'

import { shortenAddress } from 'shared/util'

const Info = () => {
  return (
    <Row gutter={16}>
      <Col>
        <Tier level={1} size={48} label={false} />
      </Col>
      <Col>
        <Space direction="vertical">
          <Space size={12}>
            <Typography.Text>Retailer 1</Typography.Text>
            <IonIcon name="open-outline" />
          </Space>
          <Typography.Text type="secondary">
            {shortenAddress('I1s3...s923')}
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Title level={5}>Gold tier</Typography.Title>
          <Typography.Text type="secondary">
            Update tier to create more pairs.
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Info
