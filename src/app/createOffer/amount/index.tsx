import { Col, Row } from 'antd'
import BuyMode from './buyMode'
import SellMode from './sellMode'

import { useAction } from 'providers/action.provider'

const Amount = () => {
  const { action } = useAction()

  return (
    <Row gutter={[12, 24]}>
      <Col span={24}>{action === 'Buy' ? <BuyMode /> : <SellMode />}</Col>
    </Row>
  )
}

export default Amount
