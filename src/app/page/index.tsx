import { useState } from 'react'

import { Row, Col, Image, Switch, Typography, Space, Tabs } from 'antd'
import Order from './user/order'
import OrderHistory from './user/history'
import FAQ from './user/FAQ'
import Watcher from 'app/components/watcher'

import './index.less'

const Page = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Watcher>
      <Row gutter={[24, 24]} justify="center">
        <Col span={18}>
          <Row gutter={[24, 24]}>
            <Col span={24} className="banner-otc">
              <Image
                src={'https://source.unsplash.com/random/?crypto?1900x600'}
                preview={false}
              />
            </Col>
            <Col span={24}>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <Space>
                    <Switch
                      checked={checked}
                      onChange={setChecked}
                      size="small"
                    />
                    <Typography.Text>Retailer mode</Typography.Text>
                  </Space>
                </Col>
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
              </Row>
            </Col>
            <Col span={24}>
              <FAQ />
            </Col>
          </Row>
        </Col>
      </Row>
    </Watcher>
  )
}

export default Page
