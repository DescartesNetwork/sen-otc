import { useEffect, useState } from 'react'

import { Col, Row, Typography, Card } from 'antd'
import CountUp from 'react-countup'

import { numeric } from 'helpers/util'

export type StatCardProps = {
  title?: string
  value?: number
  icon?: JSX.Element
  formatter?: string
}

const StatCard = ({
  title = '',
  value = 0,
  formatter = '0,0.[0]',
  icon,
}: StatCardProps) => {
  const [entries, setEntries] = useState([0, value])

  useEffect(() => {
    setEntries(([_, end]) => [end, value])
  }, [value])

  return (
    <Card>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row gutter={[12, 12]} wrap={false}>
            <Col flex="auto">
              <Typography.Text type="secondary">{title}</Typography.Text>
            </Col>
            <Col>{icon}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>
            <CountUp
              start={entries[0]}
              end={entries[1]}
              formattingFn={(value) => numeric(value).format(formatter)}
            />
          </Typography.Title>
        </Col>
      </Row>
    </Card>
  )
}

export default StatCard
