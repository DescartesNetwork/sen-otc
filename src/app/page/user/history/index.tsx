import { useUI } from '@senhub/providers'

import { Col, Row } from 'antd'
import FilterHistory from 'app/components/filterHistory'
import ListOrders from './listOrders'

import { OrderFilterOptions } from 'app/constant'

const OrderHistory = ({
  onSelect = () => {},
  orderFilter,
}: {
  onSelect: (value: OrderFilterOptions) => void
  orderFilter: OrderFilterOptions
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
        <ListOrders orderFilters={orderFilter} />
      </Col>
    </Row>
  )
}

export default OrderHistory
