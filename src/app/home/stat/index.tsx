import IconSax from '@sentre/antd-iconsax'
import { Col, Row } from 'antd'
import { numeric } from 'helpers/util'
import StatCard from './statCard'

const Stat = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Total Value Locked"
          value={`$${numeric(9999).format('0,0')}`}
          icon={<IconSax name="DollarCircle" />}
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Total Volume"
          value={`$${numeric(9997129).format('0,0')}`}
          icon={<IconSax name="Chart" />}
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Total Transactions"
          value={`${numeric(9999).format('0,0')}`}
          icon={<IconSax name="Convertshape2" />}
        />
      </Col>
    </Row>
  )
}

export default Stat
