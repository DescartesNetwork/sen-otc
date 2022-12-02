import { Col, Divider, Empty, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Navigation from './navigation'
import Stat from './stat'
import Filter from './filter'
import OfferCard from './offerCard'

import { useFilteredOrders } from 'hooks/useFilter'

const Home = () => {
  const orders = useFilteredOrders()

  return (
    <MaxWidthLayout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Navigation />
        </Col>
        <Col span={24} style={{ marginTop: 12 }}>
          <Stat />
        </Col>
        <Col span={24}>
          <Divider style={{ margin: 8 }} />
        </Col>
        <Col span={24}>
          <Filter />
        </Col>
        <Col span={24} style={{ marginTop: 12 }}>
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
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default Home
