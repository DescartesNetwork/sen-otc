// import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
// import { Card, Col, Row, Steps } from 'antd'
// import Confirm from './confirm'
// import FindRetailer from './findRetailer'
// import SelectToken from './selectToken'

// import { OrderStep } from 'app/constant'
// import { AppDispatch, AppState } from 'app/model'
// import { setOrderStep } from 'app/model/main.controller'
import NewOrder from './newOrder'

const Order = () => {
  // const dispatch = useDispatch<AppDispatch>()
  // const { orderStep } = useSelector((state: AppState) => state.main)

  // const handleStep = (current: number) => {
  //   if (orderStep < current) return
  //   return dispatch(setOrderStep(current))
  // }

  return (
    <Row gutter={[8, 8]} justify="center">
      {/* <Col xs={24} lg={12}>
        <Steps
          current={orderStep}
          size="small"
          onChange={handleStep}
          responsive={false}
        >
          <Steps.Step title="Select token" />
          <Steps.Step title="Find retailer" />
          <Steps.Step title="Confirm" />
        </Steps>
      </Col>
      <Col span={24} />
      <Col xs={24} lg={12}>
        <Card bordered={false} style={{ boxShadow: 'unset' }}>
          {orderStep === OrderStep.SelectToken && <SelectToken />}
          {orderStep === OrderStep.FindRetailer && <FindRetailer />}
          {orderStep === OrderStep.Confirm && <Confirm />}
        </Card>
      </Col> */}
      <Col span={24}>
        <NewOrder />
      </Col>
    </Row>
  )
}

export default Order
