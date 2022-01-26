import { useState } from 'react'

import { Col, Row, Space, Tabs } from 'antd'
import ButtonFilterOrders from 'app/components/buttonFilterOrders'
import ModeSettings from 'app/components/modeSettings'
import OrderHistory from './history'
import Order from './order'
import FAQ from './FAQ'

import { ALL, OrderFilterOptions, UserOrderTabs } from 'app/constant'
import { useDevice } from 'app/hooks/useDevice'

const User = () => {
  const [orderFilter, setOrderFilter] = useState<OrderFilterOptions>({
    coin: ALL,
    time: 7,
    status: ALL,
  })
  const [activeTab, setActiveTab] = useState<string>(UserOrderTabs.otc)
  const { isMobile } = useDevice()

  const activeHistory = activeTab === UserOrderTabs.history
  const showFilter = isMobile && activeHistory

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Tabs
          tabBarExtraContent={
            <Space size={2}>
              {showFilter && (
                <ButtonFilterOrders
                  onSelect={setOrderFilter}
                  orderFilter={orderFilter}
                />
              )}
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
            <OrderHistory onSelect={setOrderFilter} orderFilter={orderFilter} />
          </Tabs.TabPane>
        </Tabs>
      </Col>
      {!isMobile && <Col span={24} style={{ height: 80 }} />}
      {/* Safe spacing */}
      <Col span={24}>
        <FAQ />
      </Col>
    </Row>
  )
}

export default User
