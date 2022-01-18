import { useUI } from '@senhub/providers'
import { Space, Tabs } from 'antd'
import ButtonFilterOrders from 'app/components/buttonFilterOrders'
import { RetailerOrderTabs } from 'app/constant'
import { useState } from 'react'
import ModeSettings from '../../components/modeSettings'
import About from './about'
import Orders from './orders'

const Retailer = () => {
  const [activeTab, setActiveTab] = useState<string>(RetailerOrderTabs.about)

  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'
  const activeHistory = activeTab === RetailerOrderTabs.orderList
  const showFilter = isMobile && activeHistory

  return (
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
      <Tabs.TabPane key={RetailerOrderTabs.about} tab="About">
        <About />
      </Tabs.TabPane>
      <Tabs.TabPane key={RetailerOrderTabs.orderList} tab="Order List">
        <Orders />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default Retailer
