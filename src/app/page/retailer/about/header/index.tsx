import { Button, Card, Col, Divider, Row } from 'antd'
import { useState } from 'react'
import IonIcon from 'shared/antd/ionicon'
import NewPair from '../newPair'
import Info from './info'
import Overview from './overview'

const Header = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Card className="header-about" bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Info />
            </Col>
            <Col>
              <Divider
                type="vertical"
                style={{ color: ' #D3D3D6', height: 48 }}
              />
            </Col>
            <Col>
              <Overview />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            icon={<IonIcon name="add-outline" />}
            onClick={() => setVisible(true)}
          >
            New Pair
          </Button>
        </Col>
      </Row>
      <NewPair visible={visible} onClose={setVisible} />
    </Card>
  )
}

export default Header
