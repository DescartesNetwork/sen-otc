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
import { decimalize, explorer } from 'helpers/util'

const ZERO = new BN(0)

const CreateOffer = () => {
  const navigate = useNavigate()
  const otc = useOtc()
  const [loading, setLoading] = useState(false)
  const { mode, modeError } = useMode()
  const { bidToken } = useBidToken()
  const { address: aTokenAddress, decimals: aDecimals } =
    useMetadataBySymbol(bidToken) || {}
  const { bidAmount, bidAmountError } = useBidAmount()
  const { askToken } = useAskToken()
  const { address: bTokenAddress, decimals: bDecimals } =
    useMetadataBySymbol(askToken) || {}
  const { askAmount, askAmountError } = useAskAmount()
  const { askPrice, askPriceError } = useAskPrice()
  const { startedAt, startedAtError } = useStartedAt()
  const { endedAt, endedAtError } = useEndedAt()

  const aTokenAmount = useMemo(() => {
    if (bidAmountError) return ZERO
    if (typeof aDecimals !== 'number') return ZERO
    if (!bidAmount || !Number(bidAmount)) return ZERO
    return decimalize(Number(bidAmount), aDecimals)
  }, [bidAmount, aDecimals, bidAmountError])

  const bTokenAmount = useMemo(() => {
    if (bidAmountError || askPriceError || askAmountError) return ZERO
    if (typeof bDecimals !== 'number') return ZERO
    if (!askAmount && !askPrice) return ZERO
    const amount = Number(askAmount) || Number(bidAmount) / Number(askPrice)
    return decimalize(amount, bDecimals)
  }, [
    bidAmount,
    askAmount,
    askPrice,
    bDecimals,
    askPriceError,
    bidAmountError,
    askAmountError,
  ])

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
      const { txId } = await otc.makeOrder({
        aTokenAddress,
        aTokenAmount,
        bTokenAddress,
        bTokenAmount,
        startDate,
        endDate,
      })
      return message.success({
        content:
          'A new offer has been created. Click here to view in on Solscan!',
        onClick: () => window.open(explorer(txId), '_blank'),
        style: { cursor: 'pointer' },
      })
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

  const disabled = useMemo(() => {
    if (
      Boolean(
        modeError ||
          bidAmountError ||
          askAmountError ||
          askPriceError ||
          startedAtError ||
          endedAtError,
      )
    )
      return true
    if (
      !isAddress(aTokenAddress) ||
      !isAddress(bTokenAddress) ||
      aTokenAmount.eq(ZERO) ||
      bTokenAmount.eq(ZERO) ||
      startDate.eq(ZERO) ||
      endDate.eq(ZERO)
    )
      return true
    return false
  }, [
    modeError,
    bidAmountError,
    askAmountError,
    askPriceError,
    startedAtError,
    endedAtError,
    aTokenAddress,
    bTokenAddress,
    aTokenAmount,
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
            disabled={disabled}
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
