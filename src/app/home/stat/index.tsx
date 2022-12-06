import IconSax from '@sentre/antd-iconsax'
import { Col, Row } from 'antd'
import { numeric } from 'helpers/util'
import StatCard from './statCard'

import { useTvl } from 'providers/tvl.provider'
import { useVolume } from 'providers/volume.provider'

const Stat = () => {
  const { tvl } = useTvl()
  const { volume24h } = useVolume()

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Total Value Locked"
          value={numeric(tvl).format('$0,0.[0]')}
          icon={<IconSax name="DollarCircle" />}
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Volume 24h"
          value={numeric(volume24h).format('$0,0.[0]')}
          icon={<IconSax name="Chart" />}
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <StatCard
          title="Transactions 24h"
          value={`${numeric(9999).format('0,0')}`}
          icon={<IconSax name="Convertshape2" />}
        />
      </Col>
    </Row>
  )
}

export default Stat
