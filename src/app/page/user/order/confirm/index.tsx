import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Button, Col, Row } from 'antd'

import { numeric } from 'shared/util'
import IonIcon from 'shared/antd/ionicon'
import MintInfo from './mintInfo'
import OrderInfo from './orderInfo'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import { AppDispatch, AppState } from 'app/model'
import { notifyError, notifySuccess } from 'app/helper'
import { setOrderStep } from 'app/model/main.controller'
import configs from 'app/configs'
import { setAskAmount, setBidAmount } from 'app/model/order.controller'
import useNextOrderIndex from 'app/hooks/useNextOrderIndex'

const {
  sol: { purchasing },
} = configs

const Confirm = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: {
      bidMintAddress,
      askMintAddress,
      bidAmount,
      askAmount,
      retailerAddress,
    },
  } = useSelector((state: AppState) => state)
  const index = useNextOrderIndex(retailerAddress)
  const bidDecimals = useMintDecimals(bidMintAddress)
  const askDecimals = useMintDecimals(askMintAddress)

  const onConfirmOrder = async () => {
    try {
      setLoading(true)
      const { wallet } = window.sentre
      if (!wallet) throw new Error('Please connect wallet')
      if (!bidDecimals || !askDecimals) throw new Error('Invalid mint decimals')

      const lockTime = BigInt(86400)
      const bidValue = utils.decimalize(bidAmount, bidDecimals)
      const askValue = utils.decimalize(askAmount, askDecimals)

      const { txId } = await purchasing.placeOrder(
        index,
        bidValue,
        askValue,
        lockTime,
        retailerAddress,
        wallet,
      )
      notifySuccess('Place order', txId)
      return onClearFormOrder()
    } catch (er) {
      notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  const onClearFormOrder = () => {
    dispatch(setOrderStep(0))
    dispatch(setBidAmount(''))
    dispatch(setAskAmount(''))
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <MintInfo
              label="From"
              mintAddress={bidMintAddress}
              value={`${numeric(bidAmount).format('0,0.[0000]')} LP`}
            />
          </Col>
          <Col>
            <IonIcon name="arrow-forward-outline" />
          </Col>
          <Col>
            <MintInfo
              label="To"
              mintAddress={askMintAddress}
              value={numeric(askAmount).format('0,0.[0000]')}
              floatRight
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <OrderInfo />
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={onConfirmOrder} loading={loading} block>
          Confirm
        </Button>
      </Col>
    </Row>
  )
}
export default Confirm
