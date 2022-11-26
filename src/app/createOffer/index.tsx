import { useNavigate } from 'react-router-dom'

import { Button, Col, Row, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Mode from './mode'
import Ask from './ask'
import Bid from './bid'
import StartedAt from './startedAt'
import EndedAt from './endedAt'
import Whitelist from './whitelist'

const CreateOffer = () => {
  const navigate = useNavigate()

  return (
    <MaxWidthLayout level={3}>
      <Row gutter={[12, 24]}>
        <Col span={24}>
          <Typography.Title level={2}>Create an Offer</Typography.Title>
        </Col>
        <Col span={24} style={{ textAlign: 'end' }}>
          <Mode />
        </Col>
        <Col span={24}>
          <Bid />
        </Col>
        <Col span={24}>
          <Ask />
        </Col>
        <Col span={12}>
          <StartedAt />
        </Col>
        <Col span={12}>
          <EndedAt />
        </Col>
        <Col span={24}>
          <Whitelist />
        </Col>
        <Col span={12}>
          <Button
            size="large"
            shape="round"
            onClick={() => navigate('/')}
            block
          >
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
