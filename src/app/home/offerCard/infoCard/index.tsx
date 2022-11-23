import { Carousel, Col, Row } from 'antd'
import TimeCard from './timeCard'
import InterestCard from './interestCard'
import BalanceCard from './balanceCard'

import { useInfix } from 'hooks/useUi'
import { Infix } from 'store/ui.reducer'

import './index.css'

const InfoCard = () => {
  const infix = useInfix()
  const mobile = infix < Infix.md

  if (mobile)
    return (
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Carousel dots={{ className: 'carousel-dots' }} autoplay>
            <TimeCard />
            <InterestCard />
            <BalanceCard />
          </Carousel>
        </Col>
      </Row>
    )
  return (
    <Row gutter={[12, 12]}>
      <Col span={8}>
        <TimeCard />
      </Col>
      <Col span={8}>
        <InterestCard />
      </Col>
      <Col span={8}>
        <BalanceCard />
      </Col>
    </Row>
  )
}

export default InfoCard
