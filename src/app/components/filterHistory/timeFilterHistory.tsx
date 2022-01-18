import { Col, Row, Select, Typography } from 'antd'

import { FilterOrderSet, TIME_FRAME } from 'app/constant'

const TimeFilterHistory = ({
  orderState,
  onSelect = () => {},
}: {
  orderState: FilterOrderSet
  onSelect: (value: FilterOrderSet) => void
}) => {
  const handleOnChange = (value: number) => {
    if (!orderState) return
    onSelect({ ...orderState, time: value })
  }
  return (
    <Row className="filter-history">
      <Col span={24}>
        <Typography.Text type="secondary">Time</Typography.Text>
      </Col>
      <Col span={24}>
        <Select value={orderState.time} onChange={handleOnChange} size="small">
          {TIME_FRAME.map((item) => (
            <Select.Option key={item}>Past {item} days</Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
export default TimeFilterHistory
