import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Popover, Row, Typography } from 'antd'
import Balance from './balance'
import Network from './network'

const SettingContent = () => {
  return (
    <Row gutter={[24, 24]} style={{ width: 300, padding: 12 }}>
      <Col span={24} className="kylan-dash right">
        <Typography.Title level={3}>Setting</Typography.Title>
      </Col>
      <Col span={24}>
        <Balance />
      </Col>
      <Col span={24}>
        <Network />
      </Col>
    </Row>
  )
}

const Setting = () => {
  return (
    <Popover content={SettingContent} trigger={['click']} showArrow={false}>
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
