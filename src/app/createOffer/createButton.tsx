import { useCallback, useMemo, useState } from 'react'
import { isAddress } from '@sentre/otc'
import { BN } from 'bn.js'

import { Button, message } from 'antd'

import { useOtc } from 'hooks/useProvider'
import { useMetadataBySymbol } from 'hooks/useToken'
import { decimalize, explorer } from 'helpers/util'
import { useDatetime } from 'providers/datetime.provider'
import { useBid } from 'providers/bid.provider'
import { useAsk } from 'providers/ask.provider'

const ZERO = new BN(0)

const CreateButton = () => {
  const otc = useOtc()
  const [loading, setLoading] = useState(false)
  const { bidToken, bidAmount, bidAmountError } = useBid()
  const { address: aTokenAddress, decimals: aDecimals } =
    useMetadataBySymbol(bidToken) || {}
  const { askToken, askAmount, askAmountError, askPrice, askPriceError } =
    useAsk()
  const { address: bTokenAddress, decimals: bDecimals } =
    useMetadataBySymbol(askToken) || {}
  const { startedAt, startedAtError, endedAt, endedAtError } = useDatetime()

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
  )
}

export default CreateButton
