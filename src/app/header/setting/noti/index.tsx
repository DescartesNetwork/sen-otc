import moment from 'moment'

import IconSax from '@sentre/antd-iconsax'
import { Col, Row, Typography } from 'antd'

import './index.css'

type NotiCardProps = {
  content?: string
  createdAt?: Date
  onClick?: () => void
}

const NotiCard = ({
  content = '',
  createdAt = new Date(),
  onClick = () => {},
}: NotiCardProps) => {
  return (
    <Row gutter={[8, 8]} className="kylan-noti" onClick={onClick}>
      <Col span={24}>
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {content}
        </Typography.Paragraph>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false} align="middle">
          <Col flex="auto">
            <IconSax name="Eye" style={{ fontSize: 12 }} />
          </Col>
          <Col>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {moment(createdAt).format('DD/MM/YYYY, h:mm A')}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const Noti = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">NOTIFICATIONS</Typography.Text>
      </Col>
      <Col span={24}>
        <NotiCard content="People love 🤍 to receive notifications. 🎉 People love 🤍 to receive notifications. 🎉" />
      </Col>
      <Col span={24}>
        <NotiCard content="👑 🎉 People love to receive notifications." />
      </Col>
      <Col span={24}>
        <NotiCard content="People love to receive notifications. 🔥" />
      </Col>
    </Row>
  )
}

export default Noti
