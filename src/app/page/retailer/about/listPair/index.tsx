import { Col, Row } from 'antd'
import ItemPair from './itemPair'
const ListPair = () => {
  return (
    <Row gutter={[24, 24]}>
      {[1, 2, 3].map((pair) => (
        <Col xl={6} md={8} sm={12} xs={24} key={pair}>
          <ItemPair />
        </Col>
      ))}
    </Row>
  )
}

export default ListPair
