import moment from 'moment'

import IconSax from '@sentre/antd-iconsax'
import { Col, Row, Space, Typography } from 'antd'

import { useRecentNoti } from 'hooks/useNoti'

import './index.css'

type NotiCardProps = {
  title?: string
  content?: string
  createdAt?: Date
  onClick?: () => void
}

const NotiCard = ({
  title = '',
  content = '',
  createdAt = new Date(),
  onClick = () => {},
}: NotiCardProps) => {
  return (
    <Row gutter={[8, 8]} className="kylan-noti" onClick={onClick}>
      <Col span={24}>
        <Space>
          <Typography.Text type="secondary">From:</Typography.Text>
          <Typography.Text strong ellipsis>
            {title}
          </Typography.Text>
        </Space>
      </Col>
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
  const { data } = useRecentNoti()

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">NOTIFICATIONS</Typography.Text>
      </Col>
      <Col span={24}>
        <Row
          gutter={[8, 8]}
          style={{ height: 'calc(100vh - 381px)', overflow: 'auto' }}
        >
          {data?.map(({ _id, description, name, createdAt }) => (
            <Col key={_id} span={24}>
              <NotiCard
                title={name}
                content={description}
                createdAt={createdAt}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Noti
