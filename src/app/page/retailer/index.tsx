import { Tabs } from 'antd'
import ModeSettings from '../../components/modeSettings'
import About from './about'
import Orders from './orders'

const Retailer = () => {
  return (
    <Tabs tabBarExtraContent={<ModeSettings />}>
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
