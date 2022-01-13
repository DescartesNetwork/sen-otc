import { Card, Col, Row, Steps } from 'antd'
import { OrderStep } from 'app/constant'
import { AppState } from 'app/model'
import { useSelector } from 'react-redux'
import Confirm from './confirm'
import FindRetailer from './findRetailer'
import OrderSelectToken from './orderSelectToken'

const Order = () => {
  const { orderStep } = useSelector((state: AppState) => state.main)

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={14}>
        <Steps current={orderStep} size="small">
          <Steps.Step>Select token</Steps.Step>
          <Steps.Step>Find retailer</Steps.Step>
          <Steps.Step>Confirm</Steps.Step>
        </Steps>
      </Col>
      <Col span={14}>
        <Card bordered={false} style={{ boxShadow: 'unset' }}>
          {orderStep === OrderStep.SelectToken && <OrderSelectToken />}
          {orderStep === OrderStep.FindRetailer && <FindRetailer />}
          {orderStep === OrderStep.Confirm && <Confirm />}
        </Card>
      </Col>
    </Row>
  )
}

export default Order
