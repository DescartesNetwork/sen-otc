import moment from 'moment'

import { Card, Col, Progress, Row, Space, Typography } from 'antd'
import {
  ActiveOfferTag,
  EndedOfferTag,
  UpcomingOfferTag,
} from 'components/offerTag'

import { useCountdown } from 'hooks/useCountdown'
import { useOrderSelector } from 'hooks/useOrder'
import { useMemo } from 'react'

export type TimeCardProps = { orderAddress: string }

const TimeCard = ({ orderAddress }: TimeCardProps) => {
  const { startDate, endDate } = useOrderSelector(
    (orders) => orders[orderAddress],
  )

  const startIn = useMemo(
    () => startDate.toNumber() - Math.floor(Date.now() / 1000),
    [startDate],
  )
  const endIn = useMemo(
    () => endDate.toNumber() - Math.floor(Date.now() / 1000),
    [endDate],
  )

  const title = useMemo(() => {
    if (startIn > 0) return 'Start In'
    if (endIn > 0) return 'End In'
    return 'Closed'
  }, [startIn, endIn])
  const time = useMemo(() => {
    if (startIn > 0) return startIn
    if (endIn > 0) return endIn
    return 0
  }, [startIn, endIn])
  const tag = useMemo(() => {
    if (startIn > 0) return <UpcomingOfferTag />
    if (endIn > 0) return <ActiveOfferTag />
    return <EndedOfferTag />
  }, [startIn, endIn])

  const [counter] = useCountdown(time)
  const duration = moment.duration(counter, 'seconds')

  return (
    <Card style={{ height: '100%' }}>
      <Row gutter={[8, 8]} align="middle">
        <Col span={24}>
          <Typography.Text type="secondary">{title}</Typography.Text>
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
          {tag}
        </Col>
      </Row>
    </Card>
  )
}

export default TimeCard
