import { Carousel, Col, Row } from 'antd'
import TimeCard from './timeCard'
import InterestCard from './interestCard'
import BalanceCard from './balanceCard'

import { useInfix } from 'hooks/useUi'
import { Infix } from 'store/ui.reducer'

import './index.css'

export type InfoCardProps = {
  orderAddress: string
}

const InfoCard = ({ orderAddress }: InfoCardProps) => {
  const infix = useInfix()

  if (infix < Infix.md)
    return (
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Carousel dots={{ className: 'carousel-dots' }} autoplay>
            <TimeCard orderAddress={orderAddress} />
            <InterestCard orderAddress={orderAddress} />
            <BalanceCard orderAddress={orderAddress} />
          </Carousel>
        </Col>
      </Row>
    )
  return (
    <Row gutter={[12, 12]}>
      <Col span={8}>
        <TimeCard orderAddress={orderAddress} />
      </Col>
      <Col span={8}>
        <InterestCard orderAddress={orderAddress} />
      </Col>
      <Col span={8}>
        <BalanceCard orderAddress={orderAddress} />
      </Col>
    </Row>
  )
}

export default InfoCard
