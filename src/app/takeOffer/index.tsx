import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAddress } from '@sentre/otc'
import { BN } from 'bn.js'

import IconSax from '@sentre/antd-iconsax'
import { Button, Checkbox, Col, message, Row, Space, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import PaidAmount from './paidAmount'
import ReceivedAmount from './receivedAmount'
import Stat from './stat'

import { useOrderMode, useOrderPartneredToken } from 'hooks/useOrder'
import { useRouteParam } from 'hooks/useQueryParam'
import {
  usePaidAmount,
  usePaidToken,
  useReceivedAmount,
} from 'hooks/useTakeOrder'
import { decimalize, explorer } from 'helpers/util'
import { useOtc } from 'hooks/useProvider'

const ZERO = new BN(0)

const TakeOffer = () => {
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const orderAddress = useRouteParam('orderAddress') || ''
  const navigate = useNavigate()
  const otc = useOtc()
  const mode = useOrderMode(orderAddress)
  const partneredToken = useOrderPartneredToken(orderAddress)
  const { paidAmount, paidAmountError } = usePaidAmount()
  const { receivedAmountError } = useReceivedAmount()
  const paidToken = usePaidToken()

  const amount = useMemo(() => {
    const decimals = paidToken?.decimals
    if (typeof decimals !== 'number') return ZERO
    return decimalize(Number(paidAmount), decimals)
  }, [paidToken, paidAmount])

  const takeOrder = useCallback(async () => {
    try {
      setLoading(true)
      if (!isAddress(orderAddress) || amount.eq(ZERO)) return
      const { txId } = await otc.takeOrder({ orderAddress, amount })
      return message.success({
        content:
          'You have match the offer successfully. Click here to view in on Solscan!',
        onClick: () => window.open(explorer(txId), '_blank'),
        style: { cursor: 'pointer' },
      })
    } catch (er: any) {
      console.log(er.logs)
      return message.error(er.message)
    } finally {
      return setLoading(false)
    }
  }, [otc, amount, orderAddress])

  const disabled = useMemo(() => {
    if (Boolean(paidAmountError || receivedAmountError)) return true
    if (!isAddress(orderAddress) || amount.eq(ZERO)) return true
    return !confirmed
  }, [paidAmountError, receivedAmountError, confirmed, orderAddress, amount])

  return (
    <MaxWidthLayout level={3}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Space>
            <Button
              size="large"
              type="text"
              icon={<IconSax name="ArrowLeft2" />}
              onClick={() => navigate('/home')}
              style={{ marginLeft: -8 }}
            />
            <Typography.Title level={2}>
              {mode} {partneredToken?.symbol}
            </Typography.Title>
          </Space>
        </Col>
        <Col span={24}>
          <PaidAmount />
        </Col>
        <Col span={24}>
          <ReceivedAmount />
        </Col>
        <Col span={24} style={{ marginTop: 24 }}>
          <Stat />
        </Col>
        <Col span={24}>
          <Space>
            <Checkbox
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            >
              I have read and agreed to this transaction.
            </Checkbox>
          </Space>
        </Col>
        <Col span={24}>
          <Button
            size="large"
            type="primary"
            onClick={takeOrder}
            disabled={disabled}
            loading={loading}
            block
          >
            Take Offer
          </Button>
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default TakeOffer
