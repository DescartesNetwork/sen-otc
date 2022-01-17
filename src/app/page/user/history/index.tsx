import { useState } from 'react'

import { Col, Row } from 'antd'
import FilterHistory from 'app/components/filterHistory'
import ListHistory from './listOrders'

import { ALL, FilterOrderSet } from 'app/constant'

const OrderHistory = () => {
  const [orderFilter, setOrderFilter] = useState<FilterOrderSet>({
    coin: ALL,
    time: 7,
    status: ALL,
  })

  return (
    <Row gutter={[12, 24]}>
      <FilterHistory
        onSelect={(value) => {
          setOrderFilter(value)
        }}
        filterValues={orderFilter}
      />
      <Col span={24}>
        <ListHistory orderFilters={orderFilter} />
      </Col>
    </Row>
  )
}

export default OrderHistory
