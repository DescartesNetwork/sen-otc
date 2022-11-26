import { Col, Row } from 'antd'
import Ask from './ask'
import Bid from './bid'

const SellMode = () => {
  return (
    <Row gutter={[12, 24]}>
      <Col span={24}>
        <Bid />
      </Col>
      <Col span={24}>
        <Ask />
      </Col>
    </Row>
  )
}

export default SellMode
