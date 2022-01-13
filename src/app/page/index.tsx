import { useState } from 'react'

import { Row, Col, Image, Switch, Typography, Space } from 'antd'
import User from './user'

import './index.less'
import Retailer from './retailer'

import './index.less'

const Page = () => {
  const [checked, setChecked] = useState(false)
  return (
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
              <Col span={24}>{checked ? <Retailer /> : <User />}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Page
