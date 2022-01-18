import { useUI } from '@senhub/providers'

import { Col, Row, Typography } from 'antd'

const Content = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'
  const colSpan = !isMobile ? 24 : undefined
  const flexType = isMobile ? 'auto' : undefined

  return (
    <Row>
      <Col span={colSpan} flex={flexType}>
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col span={colSpan}>
        <Typography.Title level={5}>{value}</Typography.Title>
      </Col>
    </Row>
  )
}

const Overview = () => {
  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'
  const colSpan = isMobile ? 24 : undefined

  return (
    <Row gutter={{ lg: 12, xl: 24 }}>
      <Col span={colSpan}>
        <Content label="Rate" value="98.01%" />
      </Col>
      <Col span={colSpan}>
        <Content label="Approved order" value={99} />
      </Col>
      <Col span={colSpan}>
        <Content label="Reject order" value={2} />
      </Col>
      <Col span={colSpan}>
        <Content label="Usable pair" value={4} />
      </Col>
      <Col span={colSpan}>
        <Content label="Created pair" value={5} />
      </Col>
    </Row>
  )
}

export default Overview
