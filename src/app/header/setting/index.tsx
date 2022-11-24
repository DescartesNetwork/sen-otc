import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Divider, Popover, Row, Typography } from 'antd'
import Balance from './balance'
import Network from './network'
import Noti from './noti'

const SettingContent = () => {
  return (
    <Row gutter={[12, 12]} style={{ width: 300, padding: 12 }}>
      <Col span={24} className="kylan-dash right">
        <Typography.Title level={3}>Setting</Typography.Title>
      </Col>
      <Col span={24} />
      <Col span={24}>
        <Noti />
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
      <Col span={24}>
        <Balance />
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
      <Col span={24}>
        <Network />
      </Col>
    </Row>
  )
}

const Setting = () => {
  return (
    <Popover
      content={SettingContent}
      trigger={['click']}
      showArrow={false}
      destroyTooltipOnHide
    >
      <Button
        type="text"
        size="large"
        shape="circle"
        icon={<IconSax name="Setting3" />}
      />
    </Popover>
  )
}

export default Setting
