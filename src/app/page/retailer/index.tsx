import { Tabs } from 'antd'
import About from './about'
import Order from './order'

const Retailer = () => {
  return (
    <Tabs tabBarGutter={32}>
      <Tabs.TabPane key="about" tab="About">
        <About />
      </Tabs.TabPane>
      <Tabs.TabPane key="order-list" tab="Order List">
        <Order />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default Retailer
