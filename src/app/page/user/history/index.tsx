import { useState } from 'react'
import { useUI } from '@senhub/providers'

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

  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'

  return (
    <Row gutter={[12, 24]}>
      {!isMobile && (
        <Col span={24}>
          <FilterHistory onSelect={setOrderFilter} filterValues={orderFilter} />
        </Col>
      )}
      <Col span={24}>
        <ListHistory orderFilters={orderFilter} />
      </Col>
    </Row>
  )
}

export default OrderHistory
