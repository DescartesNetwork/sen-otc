import { Tabs } from 'antd'
import About from './about'
import Orders from './orders'

const Retailer = () => {
  return (
    <Tabs activeKey="order-list" tabBarGutter={32}>
      <Tabs.TabPane key="about" tab="About">
        <About />
      </Tabs.TabPane>
      <Tabs.TabPane key="order-list" tab="Order List">
        <Orders />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default Retailer
