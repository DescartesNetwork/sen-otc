import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAddress } from '@sentre/otc'
import { BN } from 'bn.js'

import { Button, Col, message, Row, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Mode from './mode'
import BuyMode from './buyMode'
import SellMode from './sellMode'
import Stat from './stat'
import StartedAt from './startedAt'
import EndedAt from './endedAt'
import Whitelist from './whitelist'

import {
  useAskAmount,
  useAskPrice,
  useAskToken,
  useBidAmount,
  useBidToken,
  useEndedAt,
  useMode,
  useStartedAt,
} from 'hooks/useNewOrder'
import { useOtc } from 'hooks/useProvider'
import { useMetadataBySymbol } from 'hooks/useToken'
import { decimalize } from 'helpers/util'

const ZERO = new BN(0)

const CreateOffer = () => {
  const navigate = useNavigate()
  const otc = useOtc()
  const [loading, setLoading] = useState(false)
  const { mode } = useMode()
  const { bidToken } = useBidToken()
  const { address: aTokenAddress, decimals: aDecimals } =
    useMetadataBySymbol(bidToken) || {}
  const { bidAmount } = useBidAmount()
  const { askToken } = useAskToken()
  const { address: bTokenAddress, decimals: bDecimals } =
    useMetadataBySymbol(askToken) || {}
  const { askAmount } = useAskAmount()
  const { askPrice } = useAskPrice()
  const { startedAt } = useStartedAt()
  const { endedAt } = useEndedAt()

  const aTokenAmount = useMemo(() => {
    if (typeof aDecimals !== 'number') return ZERO
    if (!bidAmount || !Number(bidAmount)) return ZERO
    return decimalize(Number(bidAmount), aDecimals)
  }, [bidAmount, aDecimals])

  const bTokenAmount = useMemo(() => {
    if (typeof bDecimals !== 'number') return ZERO
    if (!askAmount && !askPrice) return ZERO
    const amount = Number(askAmount) || Number(bidAmount) / Number(askPrice)
    return decimalize(amount, bDecimals)
  }, [bidAmount, askAmount, askPrice, bDecimals])

  const startDate = useMemo(() => {
    if (!startedAt) return ZERO
    return new BN(Math.floor(Number(new Date(startedAt)) / 1000))
  }, [startedAt])

  const endDate = useMemo(() => {
    if (!endedAt) return ZERO
    return new BN(Math.floor(Number(new Date(endedAt)) / 1000))
  }, [endedAt])

  const onCreate = useCallback(async () => {
    try {
      setLoading(true)
      if (
        !isAddress(aTokenAddress) ||
        !isAddress(bTokenAddress) ||
        aTokenAmount.eq(ZERO) ||
        bTokenAmount.eq(ZERO) ||
        startDate.eq(ZERO) ||
        endDate.eq(ZERO)
      )
        return
      const txId = await otc.makeOrder({
        aTokenAddress,
        aTokenAmount,
        bTokenAddress,
        bTokenAmount,
        startDate,
        endDate,
      })
      return console.log(txId)
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(false)
    }
  }, [
    otc,
    aTokenAddress,
    aTokenAmount,
    bTokenAddress,
    bTokenAmount,
    startDate,
    endDate,
  ])

  return (
    <MaxWidthLayout level={3}>
      <Row gutter={[12, 24]}>
        <Col span={24}>
          <Typography.Title level={2}>Create an Offer</Typography.Title>
        </Col>
        <Col span={24} style={{ textAlign: 'end' }}>
          <Mode />
        </Col>
        <Col span={24}>{mode === 'Buy' ? <BuyMode /> : <SellMode />}</Col>
        <Col span={24}>
          <Stat />
        </Col>
        <Col span={12}>
          <StartedAt />
        </Col>
        <Col span={12}>
          <EndedAt />
        </Col>
        <Col span={24}>
          <Whitelist />
        </Col>
        <Col span={12}>
          <Button
            size="large"
            shape="round"
            onClick={() => navigate('/')}
            block
          >
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={onCreate}
            loading={loading}
            block
          >
            Create
          </Button>
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default CreateOffer
