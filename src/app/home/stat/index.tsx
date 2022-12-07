import IconSax from '@sentre/antd-iconsax'
import { Col, Row } from 'antd'
import StatCard from './statCard'

import { useNumberofTransaction, useTvl, useVolume24h } from 'hooks/useStat'

const Stat = () => {
  const tvl = useTvl()
  const volume24h = useVolume24h()
  const numberOfTransactions = useNumberofTransaction()

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Total Value Locked"
          value={tvl}
          icon={<IconSax name="DollarCircle" />}
          formatter="$0,0.[0]"
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Volume 24h"
          value={volume24h}
          icon={<IconSax name="Chart" />}
          formatter="$0,0.[0]"
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Transactions 24h"
          value={numberOfTransactions}
          icon={<IconSax name="Convertshape2" />}
        />
      </Col>
    </Row>
  )
}

export default Stat
