import { useMemo } from 'react'

import { Avatar, Card, Col, Row, Space, Typography } from 'antd'

import { explorer, numeric, undecimalize } from 'helpers/util'
import { useOrderSelector } from 'hooks/useOrder'
import { useMetadataByAddress } from 'hooks/useToken'

export type BalanceCardProps = {
  orderAddress: string
}

const BalanceCard = ({ orderAddress }: BalanceCardProps) => {
  const { aToken, a } = useOrderSelector((orders) => orders[orderAddress])
  const { url, symbol, decimals } =
    useMetadataByAddress(aToken.toBase58()) || {}
  const amount = useMemo(() => {
    if (typeof decimals !== 'number') return 0
    return undecimalize(a, decimals)
  }, [a, decimals])

  return (
    <Card style={{ height: '100%' }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Text type="secondary">Remainder in Pool</Typography.Text>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Title level={5}>
              {numeric(amount).format('0,0.[000]')}
            </Typography.Title>
            <Avatar src={url} size={24} />
            <Typography.Title type="secondary" level={5}>
              {symbol}
            </Typography.Title>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary">-</Typography.Paragraph>
          <Typography.Link href={explorer(orderAddress)} target="_blank">
            View it on Solscan
          </Typography.Link>
        </Col>
      </Row>
    </Card>
  )
}

export default BalanceCard
