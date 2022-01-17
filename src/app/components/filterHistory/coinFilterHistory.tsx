import { Col, Row, Select, Typography } from 'antd'

import { FilterOrderSet } from 'app/page/user/history'

const CoinFilterHistory = ({
  orderState,
  onSelect = () => {},
}: {
  orderState: FilterOrderSet | undefined
  onSelect: (value: FilterOrderSet) => void
}) => {
  const handleOnChange = (value: string) => {
    if (!orderState) return
    onSelect({ ...orderState, coin: value })
  }
  return (
    <Row className="filter-history">
      <Col span={24}>
        <Typography.Text type="secondary">Coin</Typography.Text>
      </Col>
      <Col span={24}>
        <Select value={orderState?.coin} onChange={handleOnChange} size="small">
          {[1, 2, 3, 4, 5].map((item, idx) => (
            <Select.Option key={item + idx}>Select {item}</Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
export default CoinFilterHistory
