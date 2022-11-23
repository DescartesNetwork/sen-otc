import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Typography } from 'antd'

import { useIsAdmin } from 'hooks/useRole'

const Navigation = () => {
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()

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
          onClick={() => navigate('/history')}
        >
          Transaction History
        </Button>
      </Col>
      {isAdmin && (
        <Col>
          <Button
            shape="round"
            icon={<IconSax name="ProfileCircle" />}
            style={{ fontWeight: 700 }}
            onClick={() => navigate('/my-offer')}
          >
            My Offers
          </Button>
        </Col>
      )}
      {isAdmin && (
        <Col>
          <Button
            shape="round"
            icon={<IconSax name="AddCircle" />}
            style={{ fontWeight: 700 }}
            onClick={() => navigate('/create-offer')}
          >
            Create Offer
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default Navigation
