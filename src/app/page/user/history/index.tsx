import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Col, Row } from 'antd'
import FilterHistory from 'app/components/filterHistory'
import ListHistory from './listHistory'

import { fetchHistoryOTC } from 'app/model/history.controller'
import { AppDispatch } from 'app/model'
import { OrderState } from 'app/constant'

export interface FilterOrderSet {
  coin: string
  time: number
  status: string
}

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [orderFilter, setOrderFilter] = useState<FilterOrderSet>({
    coin: 'All',
    time: 7,
    status: 'ALL',
  })

  useEffect(() => {
    dispatch(fetchHistoryOTC())
  }, [dispatch])

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
