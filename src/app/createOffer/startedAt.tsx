import dayjs from 'dayjs'

import { Col, DatePicker, Row, Typography } from 'antd'

import { useStartedAt } from 'hooks/useNewOrder'

const StartedAt = () => {
  const { startedAt, error, setStartedAt } = useStartedAt()

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">STARTED AT</Typography.Text>
      </Col>
      <Col span={24}>
        <DatePicker
          size="large"
          style={{ width: '100%' }}
          value={startedAt ? dayjs(startedAt) : null}
          onChange={(value) => setStartedAt(value?.toISOString() || '')}
          showTime
        />
      </Col>
      {error && (
        <Col span={24}>
          <Typography.Text type="danger">{error}</Typography.Text>
        </Col>
      )}
    </Row>
  )
}

export default StartedAt
