import { Col, Row, Select, Typography } from 'antd'

import { TIME_FRAME } from 'app/constant'

const TimeFilterHistory = ({
  time,
  onSelect = () => {},
}: {
  time: number
  onSelect: (value: number) => void
}) => {
  return (
    <Row className="filter-history">
      <Col span={24}>
        <Typography.Text type="secondary">Time</Typography.Text>
      </Col>
      <Col span={24}>
        <Select value={time} onChange={onSelect} size="small">
          {TIME_FRAME.map((item) => (
            <Select.Option key={item}>Past {item} days</Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
export default TimeFilterHistory
