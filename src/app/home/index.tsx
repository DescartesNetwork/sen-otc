import { Col, Divider, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Navigation from './navigation'
import Stat from './stat'
import Filter from './filter'
import OfferCard from './offerCard'

import { otcActionSelector, useOrderSelector } from 'hooks/useOrder'
import { useAction } from 'hooks/useFilter'

const Home = () => {
  const { action } = useAction()
  const orders = useOrderSelector(otcActionSelector(action))

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
          <Row gutter={[24, 24]}>
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
