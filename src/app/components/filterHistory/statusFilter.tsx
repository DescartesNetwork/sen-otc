import { Col, Row, Select, Typography } from 'antd'

import { ORDER_STATE_DIGIT } from 'app/constant'

const StatusFilterHistory = ({
  label = true,
  status,
  onSelect = () => {},
}: {
  label?: boolean
  status?: string
  onSelect: (value: string) => void
}) => {
  return (
    <Row className="filter-history">
      {label && (
        <Col span={24}>
          <Typography.Text type="secondary">Status</Typography.Text>
        </Col>
      )}
      <Col span={24}>
        <Select value={status} onChange={onSelect} size="small">
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
