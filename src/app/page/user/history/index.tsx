import { useUI } from '@senhub/providers'

import { Col, Row } from 'antd'
import FilterHistory from 'app/components/filterHistory'
import ListHistory from './listOrders'

import { FilterOrderSet } from 'app/constant'

const OrderHistory = ({
  onSelect = () => {},
  orderFilter,
}: {
  onSelect: (value: FilterOrderSet) => void
  orderFilter: FilterOrderSet
}) => {
  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'

  return (
    <Row gutter={[12, 24]}>
      {!isMobile && (
        <Col span={24}>
          <FilterHistory onSelect={onSelect} filterValues={orderFilter} />
        </Col>
      )}
      <Col span={24}>
        <ListHistory orderFilters={orderFilter} />
      </Col>
    </Row>
  )
}

export default OrderHistory
