import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'

import { Col, Divider, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Navigation from './navigation'
import Stat from './stat'
import Filter from './filter'
import OfferCard from './offerCard'

const Home = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { publicKey } = useWallet()

  // Redirect callback
  useEffect(() => {
    const params = new URLSearchParams(search)
    const redirect = params.get('redirect')
    if (publicKey && redirect) navigate(decodeURIComponent(redirect))
  }, [publicKey, navigate, search])

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
            {[1, 2, 3, 4].map((key, i) => (
              <Col key={key} span={24}>
                <Row gutter={[12, 12]}>
                  {i > 0 && (
                    <Col span={24}>
                      <Divider style={{ marginBottom: 12, marginTop: 4 }} />
                    </Col>
                  )}
                  <Col span={24}>
                    <OfferCard />
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
