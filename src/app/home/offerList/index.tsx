import { Col, Divider, Empty, Row } from 'antd'
import OfferCard from './offerCard'

import { useFilteredOrders } from 'hooks/useFilter'

const OfferList = () => {
  const orders = useFilteredOrders()

  return (
    <Row gutter={[24, 24]} justify="center">
      {!Object.keys(orders).length && (
        <Col>
          <Empty />
        </Col>
      )}
      {Object.keys(orders).map((orderAddress, i) => (
        <Col key={orderAddress} span={24}>
          <Row gutter={[12, 12]}>
            {i > 0 && (
              <Col span={24}>
                <Divider style={{ marginBottom: 12, marginTop: 12 }} />
              </Col>
            )}
            <Col span={24}>
              <OfferCard orderAddress={orderAddress} />
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  )
}

export default OfferList
