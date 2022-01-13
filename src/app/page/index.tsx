import { useState } from 'react'

import { Row, Col, Image, Switch, Typography, Space } from 'antd'
import User from './user'
import Retailer from './retailer'

import HeroBanner from 'app/static/images/otc-banner.svg'
import './index.less'
import Watcher from 'app/components/watcher'

const Page = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Watcher>
      <Row gutter={[24, 24]} justify="center">
        <Col span={18}>
          <Row gutter={[24, 24]}>
            <Col span={24} className="banner-otc">
              <Image src={HeroBanner} preview={false} />
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
                <Col span={24}>{checked ? <Retailer /> : <User />}</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Watcher>
  )
}

export default Page
