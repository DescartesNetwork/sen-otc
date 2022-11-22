import { Col, Row, Typography } from 'antd'
import Card from 'antd/es/card/Card'

export type StatCardProps = {
  title?: string
  value?: string
  icon?: JSX.Element
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
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
          <Typography.Title level={3}>{value}</Typography.Title>
        </Col>
      </Row>
    </Card>
  )
}

export default StatCard
