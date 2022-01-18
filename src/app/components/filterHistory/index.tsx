import { Col, Row } from 'antd'
import CoinFilterHistory from './coinFilterHistory'
import StatusFilterHistory from './statusFilter'
import TimeFilterHistory from './timeFilterHistory'

import { FilterOrderSet } from 'app/constant'

const FilterHistory = ({
  onSelect = () => {},
  filterValues,
}: {
  onSelect: (value: FilterOrderSet) => void
  filterValues: FilterOrderSet
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={4}>
        <CoinFilterHistory orderState={filterValues} onSelect={onSelect} />
      </Col>
      <Col span={4}>
        <TimeFilterHistory orderState={filterValues} onSelect={onSelect} />
      </Col>
      <Col span={4}>
        <StatusFilterHistory orderState={filterValues} onSelect={onSelect} />
      </Col>
    </Row>
  )
}

export default FilterHistory
