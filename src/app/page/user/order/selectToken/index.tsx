import { Button, Col, Row } from 'antd'
import { useDispatch } from 'react-redux'

import IonIcon from 'shared/antd/ionicon'
import Ask from './ask'
import Bid from './bid'

import { OrderStep } from 'app/constant'
import { setOrderStep } from 'app/model/main.controller'

const OrderSelectToken = () => {
  const dispatch = useDispatch()
  const onFindRetailer = () => {
    dispatch(setOrderStep(OrderStep.FindRetailer))
  }
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24}>
        <Bid />
      </Col>
      <Col>
        <IonIcon name="swap-vertical-outline" />
      </Col>
      <Col span={24}>
        <Ask />
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={onFindRetailer} block>
          Find retailer
        </Button>
      </Col>
    </Row>
  )
}
export default OrderSelectToken
