import { useMemo } from 'react'

import { Card, Col, Divider, Row, Space, Typography } from 'antd'

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

const ReferencePrice = () => {
  const { bidToken } = useBidToken()
  const { askToken } = useAskToken()
  const { mode } = useMode()
  const { cgkTicket } = useMemo(
    () =>
      partneredTokens.find(
        ({ symbol }) => symbol === bidToken || symbol === askToken,
      ),
    [bidToken, askToken],
  ) || { cgkTicket: '' }
  const { price: referencePrice } = usePrice(cgkTicket)

  const referenceUnit = useMemo(() => {
    if (mode === 'Buy') return askToken
    else return bidToken
  }, [mode, bidToken, askToken])

  return (
    <Space direction="vertical">
      <Typography.Title level={2}>
        ${numeric(referencePrice).format('0,0.[0000]')}
      </Typography.Title>
      <Space size={0}>
        <Typography.Text type="secondary">Reference Price</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text type="secondary">{referenceUnit}</Typography.Text>
      </Space>
    </Space>
  )
}

const OfferedPrice = () => {
  const { bidToken } = useBidToken()
  const { askToken } = useAskToken()
  const { askPrice } = useAskPrice()
  const { bidAmount } = useBidAmount()
  const { askAmount } = useAskAmount()
  const { mode } = useMode()

  const offeredPrice = useMemo(() => {
    if (askPrice) return Number(askPrice)
    if (!bidAmount || !Number(bidAmount) || !askAmount || !Number(askAmount))
      return 0
    if (mode === 'Buy') return Number(bidAmount) / Number(askAmount)
    return Number(askAmount) / Number(bidAmount)
  }, [askPrice, mode, bidAmount, askAmount])

  const offeredUnit = useMemo(() => {
    if (mode === 'Buy') return askToken
    else return bidToken
  }, [mode, bidToken, askToken])

  return (
    <Space direction="vertical">
      <Typography.Title level={2}>
        ${numeric(offeredPrice).format('0,0.[0000]')}
      </Typography.Title>
      <Space size={0}>
        <Typography.Text type="secondary">Offered Price</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text type="secondary">{offeredUnit}</Typography.Text>
      </Space>
    </Space>
  )
}

const OfferedAmount = () => {
  const { bidToken } = useBidToken()
  const { askToken } = useAskToken()
  const { askPrice } = useAskPrice()
  const { bidAmount } = useBidAmount()
  const { askAmount } = useAskAmount()
  const { mode } = useMode()

  const offeredAmount = useMemo(() => {
    if (askAmount) return Number(askAmount)
    if (!askPrice || !Number(askPrice) || !bidAmount || !Number(bidAmount))
      return 0
    if (mode === 'Buy') return Number(bidAmount) / Number(askPrice)
    return Number(askPrice) * Number(bidAmount)
  }, [askPrice, mode, bidAmount, askAmount])

  const offeredUnit = useMemo(() => {
    if (mode === 'Buy') return askToken
    else return bidToken
  }, [mode, bidToken, askToken])

  return (
    <Space direction="vertical">
      <Typography.Title level={2}>
        {numeric(offeredAmount).format('0,0.[0000]')}
      </Typography.Title>
      <Space size={0}>
        <Typography.Text type="secondary">Acquired Amount</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text type="secondary">{offeredUnit}</Typography.Text>
      </Space>
    </Space>
  )
}

const Stat = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} md={12}>
        <Card>
          <ReferencePrice />
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card>
          <OfferedPrice />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <OfferedAmount />
        </Card>
      </Col>
    </Row>
  )
}

export default Stat
