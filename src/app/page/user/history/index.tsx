import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Col, Row } from 'antd'
import FilterHistory from '../../../components/filterHistory'
import ListHistory from './listHistory'

import { fetchHistoryOTC } from 'app/model/history.controller'
import { AppDispatch } from 'app/model'

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchHistoryOTC())
  }, [dispatch])

  const [coin, setCoin] = useState('Select')
  const [time, setTime] = useState('Select')
  const [status, setStatus] = useState('Select')

  return (
    <Row gutter={[12, 24]}>
      <Col>
        <FilterHistory label="Coin" value={coin} onSelected={setCoin} />
      </Col>
      <Col>
        <FilterHistory label="Time" value={time} onSelected={setTime} />
      </Col>
      <Col>
        <FilterHistory label="Status" value={status} onSelected={setStatus} />
      </Col>
      <Col span={24}>
        <ListHistory />
      </Col>
    </Row>
  )
}

export default OrderHistory
