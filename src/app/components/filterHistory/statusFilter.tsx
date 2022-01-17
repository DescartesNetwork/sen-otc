import { Col, Row, Select, Typography } from 'antd'

import { ORDER_STATE_DIGIT, FilterOrderSet } from 'app/constant'

const StatusFilterHistory = ({
  orderState,
  onSelect = () => {},
}: {
  orderState: FilterOrderSet
  onSelect: (value: FilterOrderSet) => void
}) => {
  const handleOnChange = (value: string) => {
    if (!orderState) return
    onSelect({ ...orderState, status: value })
  }

  return (
    <Row className="filter-history">
      <Col span={24}>
        <Typography.Text type="secondary">Status</Typography.Text>
      </Col>
      <Col span={24}>
        <Select
          value={orderState?.status}
          onChange={handleOnChange}
          size="small"
        >
          {ORDER_STATE_DIGIT.map((item) => (
            <Select.Option key={item}>
              {item.charAt(0) + item.slice(1).toLowerCase()}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
export default StatusFilterHistory
