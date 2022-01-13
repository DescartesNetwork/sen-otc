import { Col, Row, Select, Typography } from 'antd'

const FilterHistory = ({
  label = '',
  value = '',
  onSelected = () => {},
}: {
  label?: string
  value?: string
  onSelected?: (value: string) => void
}) => {
  return (
    <Row>
      <Col span={24}>
        <Typography.Text>{label}</Typography.Text>
      </Col>
      <Col span={24}>
        <Select value={value} onChange={onSelected} size="small">
          <Select.Option key="Select">Select</Select.Option>
          {[1, 2, 3, 4, 5].map((item, idx) => (
            <Select.Option key={item + idx}>Select {item}</Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
export default FilterHistory
