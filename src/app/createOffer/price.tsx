import { useMemo } from 'react'

import { Col, Row, Space, Typography } from 'antd'

import configs from 'configs'
import { numeric } from 'helpers/util'
import { usePrice } from 'hooks/useToken'
import {
  useAskAmount,
  useAskPrice,
  useAskToken,
  useBidAmount,
  useBidToken,
  useMode,
} from 'hooks/useNewOrder'

const {
  otc: { partneredTokens },
} = configs

const Price = () => {
  const { bidToken } = useBidToken()
  const { askToken } = useAskToken()
  const { askPrice } = useAskPrice()
  const { bidAmount } = useBidAmount()
  const { askAmount } = useAskAmount()
  const { mode } = useMode()
  const { price: referencePrice } = usePrice(
    partneredTokens.find(
      ({ symbol }) => symbol === bidToken || symbol === askToken,
    )?.ticket || '',
  )

  const offeredPrice = useMemo(() => {
    if (askPrice) return askPrice
    if (mode === 'Buy') return Number(askAmount) / Number(bidAmount)
    return Number(bidAmount) / Number(askAmount)
  }, [askPrice, mode, bidAmount, askAmount])

  return (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Title level={2}>
            ${numeric(referencePrice).format('0,0.[0000]')}
          </Typography.Title>
          <Typography.Text type="secondary">Reference Price</Typography.Text>
        </Space>
      </Col>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Title level={2}>
            ${numeric(offeredPrice).format('0,0.[0000]')}
          </Typography.Title>
          <Typography.Text type="secondary">Offered Price</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Price
