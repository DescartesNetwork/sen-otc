import { useUI } from '@senhub/providers'

import { Col, Row, Space, Tabs } from 'antd'
import ButtonFilterOrders from 'app/components/buttonFilterOrders'
import { UserOrderTabs } from 'app/constant'
import { useState } from 'react'
import ModeSettings from '../../components/modeSettings'
import FAQ from './FAQ'
import OrderHistory from './history'
import Order from './order'

const User = () => {
  const [activeTab, setActiveTab] = useState<string>(UserOrderTabs.otc)
  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'
  const activeHistory = activeTab === UserOrderTabs.history
  const showFilter = isMobile && activeHistory

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Tabs
          tabBarExtraContent={
            <Space size={2}>
              {showFilter && <ButtonFilterOrders />}
              <ModeSettings />
            </Space>
          }
          activeKey={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.TabPane key={UserOrderTabs.otc} tab="Order OTC">
            <Order />
          </Tabs.TabPane>
          <Tabs.TabPane key={UserOrderTabs.history} tab="History">
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
