import { useUI } from '@senhub/providers'

import { Col, Row, Space, Tabs } from 'antd'
import ButtonFilterOrders from 'app/components/buttonFilterOrders'
import ModeSettings from '../../components/modeSettings'
import FAQ from './FAQ'
import OrderHistory from './history'
import Order from './order'

const User = () => {
  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Tabs
          tabBarExtraContent={
            <Space size={2}>
              {isMobile && <ButtonFilterOrders />}
              <ModeSettings />
            </Space>
          }
        >
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
