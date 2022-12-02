import IconSax from '@sentre/antd-iconsax'
import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd'
import { numeric } from 'helpers/util'

import { useAction } from 'hooks/useFilter'
import { useOfferedPrice, useOrderPartneredToken } from 'hooks/useOrder'
import { usePrice } from 'hooks/useToken'
import { useMemo } from 'react'

export type InterestCardProps = { orderAddress: string }

const InterestCard = ({ orderAddress }: InterestCardProps) => {
  const { action } = useAction()
  const offeredPrice = useOfferedPrice(orderAddress)
  const { cgkTicket } = useOrderPartneredToken(orderAddress) || {
    cgkTicket: '',
  }
  const { price: referencePrice } = usePrice(cgkTicket)

  const save = useMemo(() => {
    if (!offeredPrice || !referencePrice) return 0
    if (action === 'Buy')
      return (offeredPrice - referencePrice) / referencePrice
    return (referencePrice - offeredPrice) / referencePrice
  }, [action, offeredPrice, referencePrice])

  return (
    <Card style={{ height: '100%' }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Text type="secondary">Save</Typography.Text>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Title
              style={{ color: save >= 0 ? '#1A63FF' : '#E52E3A' }}
              level={5}
            >
              {numeric(save).format('0,0.[000]%')}
            </Typography.Title>
            <Tooltip
              title="Compared to the reference market price on CoinGecko."
              placement="topRight"
              arrowPointAtCenter
            >
              <Button
                type="text"
                size="small"
                shape="circle"
                icon={<IconSax name="Information" />}
              />
            </Tooltip>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary">-</Typography.Paragraph>
          <Typography.Link
            href={`https://www.coingecko.com/en/coins/${cgkTicket}`}
            target="_blank"
          >
            View the price on CoinGecko
          </Typography.Link>
        </Col>
      </Row>
    </Card>
  )
}

export default InterestCard
