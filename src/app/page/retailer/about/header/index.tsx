import { Button, Card, Col, Divider, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NewPair from '../newPair'
import Info from './info'
import Overview from './overview'

const Header = () => {
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
                style={{ color: '#7D89D9', height: 48 }}
              />
            </Col>
            <Col>
              <Overview />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            className="text-title"
            type="ghost"
            icon={<IonIcon name="add-outline" />}
          >
            New Pair
          </Button>
        </Col>
      </Row>
      <NewPair />
    </Card>
  )
}

export default Header
