import { Button, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import IonIcon from 'shared/antd/ionicon'
import Ask from './ask'
import Bid from './bid'

import { OrderStep } from 'app/constant'
import { setOrderStep } from 'app/model/main.controller'
import { AppDispatch, AppState } from 'app/model'

const OrderSelectToken = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { bidAmount, askAmount },
  } = useSelector((state: AppState) => state)

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
        <Button
          type="primary"
          onClick={onFindRetailer}
          block
          disabled={!Number(bidAmount) || !Number(askAmount)}
        >
          Find retailer
        </Button>
      </Col>
    </Row>
  )
}
export default OrderSelectToken
