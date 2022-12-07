import { useMemo } from 'react'

import { Card, Col, Divider, Row, Space, Typography } from 'antd'

import configs from 'configs'
import { numeric } from 'helpers/util'
import { usePrice } from 'hooks/useToken'
import { useAction } from 'providers/action.provider'
import { useBid } from 'providers/bid.provider'
import { useAsk } from 'providers/ask.provider'

const {
  otc: { partneredTokens },
} = configs

const ReferencePrice = () => {
  const { bidToken } = useBid()
  const { askToken } = useAsk()
  const { action } = useAction()
  const { cgkTicket } = useMemo(
    () =>
      partneredTokens.find(
        ({ symbol }) => symbol === bidToken || symbol === askToken,
      ),
    [bidToken, askToken],
  ) || { cgkTicket: '' }
  const { price: referencePrice } = usePrice(cgkTicket)

  const referenceUnit = useMemo(() => {
    if (action === 'Buy') return askToken
    else return bidToken
  }, [action, bidToken, askToken])

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
  const { bidToken, bidAmount } = useBid()
  const { askToken, askPrice, askAmount } = useAsk()
  const { action } = useAction()

  const offeredPrice = useMemo(() => {
    if (askPrice) return Number(askPrice)
    if (!bidAmount || !Number(bidAmount) || !askAmount || !Number(askAmount))
      return 0
    if (action === 'Buy') return Number(bidAmount) / Number(askAmount)
    return Number(askAmount) / Number(bidAmount)
  }, [askPrice, action, bidAmount, askAmount])

  const offeredUnit = useMemo(() => {
    if (action === 'Buy') return askToken
    else return bidToken
  }, [action, bidToken, askToken])

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
  const { bidToken, bidAmount } = useBid()
  const { askToken, askPrice, askAmount } = useAsk()
  const { action } = useAction()

  const offeredAmount = useMemo(() => {
    if (askAmount) return Number(askAmount)
    if (!askPrice || !Number(askPrice) || !bidAmount || !Number(bidAmount))
      return 0
    if (action === 'Buy') return Number(bidAmount) / Number(askPrice)
    return Number(askPrice) * Number(bidAmount)
  }, [askPrice, action, bidAmount, askAmount])

  const offeredUnit = useMemo(() => {
    if (action === 'Buy') return askToken
    else return bidToken
  }, [action, bidToken, askToken])

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
