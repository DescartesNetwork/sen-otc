import dayjs from 'dayjs'

import { Col, DatePicker, Row, Typography } from 'antd'

import { useEndedAt } from 'hooks/useNewOrder'

const EndedAt = () => {
  const { endedAt, error, setEndedAt } = useEndedAt()

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">ENDED AT</Typography.Text>
      </Col>
      <Col span={24}>
        <DatePicker
          size="large"
          style={{ width: '100%' }}
          value={endedAt ? dayjs(endedAt) : null}
          onChange={(e) => setEndedAt(e?.toISOString() || '')}
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

export default EndedAt
