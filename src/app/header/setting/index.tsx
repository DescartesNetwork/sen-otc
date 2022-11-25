import { Fragment, useState } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Divider, Drawer, Row, Typography } from 'antd'
import Balance from './balance'
import Noti from './noti'

const Setting = () => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Button
        type="text"
        size="large"
        shape="circle"
        icon={<IconSax name="Setting3" />}
        onClick={() => setOpen(true)}
      />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        closable={false}
        destroyOnClose
      >
        <Row gutter={[24, 24]}>
          <Col span={24} className="kylan-dash right">
            <Row gutter={[12, 12]}>
              <Col flex="auto">
                <Typography.Title level={3}>Setting</Typography.Title>
              </Col>
              <Col>
                <Button
                  type="text"
                  icon={<IconSax name="CloseSquare" />}
                  onClick={() => setOpen(false)}
                  style={{ marginRight: -8 }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Noti />
          </Col>
          <Col span={24}>
            <Divider style={{ margin: 0 }} />
          </Col>
          <Col span={24}>
            <Balance />
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  )
}

export default Setting
