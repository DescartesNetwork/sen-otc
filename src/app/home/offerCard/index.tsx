import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Avatar, Button, Col, Row, Space, Typography } from 'antd'
import InfoCard from './infoCard'

import { explorer, numeric, shortenAddress } from 'helpers/util'
import { useAction } from 'hooks/useFilter'
import {
  useOfferedPrice,
  useOrderPartneredToken,
  useOrderPaymentMethod,
} from 'hooks/useOrder'
import { useWidth } from 'hooks/useUi'
import { Infix } from 'store/ui.reducer'

export type OfferCardProps = {
  orderAddress: string
}

const OfferCard = ({ orderAddress }: OfferCardProps) => {
  const navigate = useNavigate()
  const width = useWidth()
  const { action } = useAction()
  const offeredPrice = useOfferedPrice(orderAddress)
  const paymentMethod = useOrderPaymentMethod(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)

  const onOpen = useCallback(() => {
    return navigate(`/offer/${orderAddress}`)
  }, [orderAddress, navigate])

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Offer Price</Typography.Text>
          <Space>
            <Avatar src={paymentMethod?.url} size={40} />
            <Space direction="vertical" size={0}>
              <Typography.Title level={4}>
                {numeric(offeredPrice).format('0,0.[000]')}
              </Typography.Title>
              <Typography.Text type="secondary">
                {paymentMethod?.symbol}/{partneredToken?.symbol}
              </Typography.Text>
            </Space>
          </Space>
        </Space>
      </Col>
      <Col span={12} style={{ textAlign: 'end' }}>
        <Space direction="vertical">
          <Space>
            <Typography.Text type="secondary">
              Offer ID:{' '}
              {shortenAddress(orderAddress, width >= Infix.md ? 4 : 2)}
            </Typography.Text>
            <Button
              type="text"
              size="small"
              shape="circle"
              icon={<IconSax name="ExportCircle" />}
              onClick={() => window.open(explorer(orderAddress), '_blank')}
            />
          </Space>
          <Button type="primary" size="large" shape="round" onClick={onOpen}>
            <Space style={{ position: 'relative', top: -3 }}>
              <Avatar src={partneredToken?.url} size={24} />
              <Typography.Title level={5} style={{ color: '#ffffff' }}>
                {action} {partneredToken?.symbol}
              </Typography.Title>
            </Space>
          </Button>
        </Space>
      </Col>
      <Col xs={24}>
        <InfoCard orderAddress={orderAddress} />
      </Col>
    </Row>
  )
}

export default OfferCard
