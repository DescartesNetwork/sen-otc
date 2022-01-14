import { Col, Row, Tabs } from 'antd'
import FAQ from './FAQ'
import OrderHistory from './history'
import Order from './order'

const User = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Tabs tabBarGutter={32}>
          <Tabs.TabPane key="order-otc" tab="Order OTC">
            <Order />
          </Tabs.TabPane>
          <Tabs.TabPane key="history-otc" tab="History">
            <OrderHistory />
          </Tabs.TabPane>
        </Tabs>
      </Col>
      <Col span={24} style={{ height: 80 }} /> {/* Safe spacing */}
      <Col span={24}>
        <FAQ />
      </Col>
    </Row>
  )
}

export default User
