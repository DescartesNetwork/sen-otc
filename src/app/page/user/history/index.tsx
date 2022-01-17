import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Col, Row } from 'antd'
import FilterHistory from '../../../components/filterHistory'
import ListHistory from './listHistory'

import { fetchHistoryOTC } from 'app/model/history.controller'
import { AppDispatch } from 'app/model'

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [coin, setCoin] = useState('Select')
  const [time, setTime] = useState('Select')
  const [status, setStatus] = useState('Select')

  useEffect(() => {
    dispatch(fetchHistoryOTC())
  }, [dispatch])

  return (
    <Row gutter={[12, 24]}>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col xs={24} lg={4}>
            <FilterHistory label="Coin" value={coin} onSelected={setCoin} />
          </Col>
          <Col xs={12} lg={4}>
            <FilterHistory label="Time" value={time} onSelected={setTime} />
          </Col>
          <Col xs={12} lg={4}>
            <FilterHistory
              label="Status"
              value={status}
              onSelected={setStatus}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <ListHistory />
      </Col>
    </Row>
  )
}

export default OrderHistory
