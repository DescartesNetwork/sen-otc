import { Card, Col, Row, Steps } from 'antd'
import { OrderStep } from 'app/constant'
import { AppState } from 'app/model'
import { useSelector } from 'react-redux'
import Confirm from './confirm'
import FindRetailer from './findRetailer'
import SelectToken from './selectToken'

const Order = () => {
  const { orderStep } = useSelector((state: AppState) => state.main)

  return (
    <Row gutter={[8, 8]} justify="center">
      <Col span={10}>
        <Steps current={orderStep} size="small">
          <Steps.Step title="Select token" />
          <Steps.Step title="Find retailer" />
          <Steps.Step title="Confirm" />
        </Steps>
      </Col>
      <Col span={24} />
      <Col span={10}>
        <Card bordered={false} style={{ boxShadow: 'unset' }}>
          {orderStep === OrderStep.SelectToken && <SelectToken />}
          {orderStep === OrderStep.FindRetailer && <FindRetailer />}
          {orderStep === OrderStep.Confirm && <Confirm />}
        </Card>
      </Col>
    </Row>
  )
}

export default Order
