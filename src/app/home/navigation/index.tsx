import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Typography } from 'antd'

const Navigation = () => {
  return (
    <Row gutter={[8, 8]} align="middle">
      <Col flex="auto">
        <Typography.Title level={2}>OTC Desk</Typography.Title>
      </Col>
      <Col>
        <Button
          shape="round"
          icon={<IconSax name="DocumentText1" />}
          style={{ fontWeight: 700 }}
        >
          Transaction History
        </Button>
      </Col>
      <Col>
        <Button
          shape="round"
          icon={<IconSax name="ProfileCircle" />}
          style={{ fontWeight: 700 }}
        >
          Your Offers
        </Button>
      </Col>
      <Col>
        <Button
          shape="round"
          icon={<IconSax name="AddCircle" />}
          style={{ fontWeight: 700 }}
        >
          Create Offer
        </Button>
      </Col>
    </Row>
  )
}

export default Navigation
