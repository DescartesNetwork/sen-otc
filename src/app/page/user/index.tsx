import { Col, Row, Tabs } from 'antd'
import FAQ from './FAQ'
import OrderHistory from './history'
import Order from './order'

const User = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Tabs tabBarGutter={32}>
          <Tabs.TabPane key="order-otc" tab="Order OTC">
            <Order />
          </Tabs.TabPane>
          <Tabs.TabPane key="history-otc" tab="History">
            <OrderHistory />
          </Tabs.TabPane>
        </Tabs>
      </Col>
      <Col>
        <FAQ />
      </Col>
    </Row>
  )
}

export default User
