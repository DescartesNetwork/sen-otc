import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import { AppState } from 'app/model'
import ItemPair from './itemPair'

const ListPair = () => {
  const { retailers } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[24, 24]}>
      {Object.keys(retailers).map((address) => (
        <Col lg={6} md={8} sm={12} xs={24} key={address}>
          <ItemPair address={address} />
        </Col>
      ))}
    </Row>
  )
}

export default ListPair
