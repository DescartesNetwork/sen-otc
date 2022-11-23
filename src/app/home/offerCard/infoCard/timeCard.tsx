import moment from 'moment'

import { Card, Col, Progress, Row, Space, Typography } from 'antd'
import {
  ActiveOfferTag,
  EndedOfferTag,
  UpcomingOfferTag,
} from 'components/offerTag'

import { useCountdown } from 'hooks/useCountdown'

const TimeCard = () => {
  const [counter] = useCountdown(20 * 24 * 60 * 60)
  const duration = moment.duration(counter, 'seconds')

  return (
    <Card style={{ height: '100%' }}>
      <Row gutter={[8, 8]} align="middle">
        <Col span={24}>
          <Typography.Text type="secondary">Start In</Typography.Text>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Title style={{ color: '#1A63FF' }} level={5}>
              {`${duration.days()}d : ${duration.hours()}h : ${duration.minutes()}m`}
            </Typography.Title>
            <Progress
              type="circle"
              percent={100 - duration.seconds() / 0.6}
              width={14}
            />
          </Space>
        </Col>
        <Col span={24} style={{ marginTop: 22 }}>
          <Space>
            <ActiveOfferTag />
            <UpcomingOfferTag />
            <EndedOfferTag />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default TimeCard
