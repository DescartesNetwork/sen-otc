import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'

import { Button, Card, Col, Modal, Row, Typography } from 'antd'
import { AppDispatch, AppState } from 'app/model'
import { onHandleModalRetailer } from 'app/model/main.controller'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import RowInfo from '../confirm/rowInfo'
import MarketPrice from '../newOrder/marketPrice'
import { useRetailerFee } from 'app/hooks/useRetailerFee'
import useNextOrderIndex from 'app/hooks/useNextOrderIndex'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { notifyError, notifySuccess } from 'app/helper'

import configs from 'app/configs'
import { setRetailerAddress } from 'app/model/order.controller'

const {
  sol: { purchasing },
} = configs

const Action = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: {
      bidMintAddress,
      bidAmount,
      retailerAddress,
      askAmount,
      askMintAddress,
    },
  } = useSelector((state: AppState) => state)
  const { fee } = useRetailerFee(retailerAddress)
  const index = useNextOrderIndex(retailerAddress)
  const bidDecimals = useMintDecimals(bidMintAddress)
  const askDecimals = useMintDecimals(askMintAddress)
  const { balance: bidBalance } = useAccountBalanceByMintAddress(bidMintAddress)
  const bidVal = Number(bidAmount)
  const disabled = bidVal === 0 || bidVal > bidBalance
  const existedRetailer = account.isAddress(retailerAddress)

  const onConfirmOrder = async () => {
    try {
      setLoading(true)
      const { wallet } = window.sentre
      if (!wallet) throw new Error('Please connect wallet')
      if (!bidDecimals || !askDecimals) throw new Error('Invalid mint decimals')

      const lockTime = BigInt(1)
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
      await dispatch(setRetailerAddress(''))
      notifySuccess('Place order', txId)
    } catch (er) {
      notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[16, 16]}>
      {existedRetailer ? (
        <Fragment>
          <Col span={12}>
            <Button onClick={() => setVisible(true)} block>
              Deal
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              onClick={onConfirmOrder}
              loading={loading}
              block
            >
              Order
            </Button>
          </Col>
        </Fragment>
      ) : (
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => dispatch(onHandleModalRetailer({ visible: true }))}
            disabled={disabled}
            block
          >
            Find retailer
          </Button>
        </Col>
      )}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        centered
        footer={false}
      >
        <Row gutter={[8, 8]} justify="end">
          <Col span={24}>
            <Typography.Title level={5}>Deal</Typography.Title>
          </Col>
          <Col span={24}>
            <NumericInput
              prefix={
                <Typography.Text type="secondary">Fee(%)</Typography.Text>
              }
            />
          </Col>
          <Col>
            <Button
              type="text"
              size="small"
              icon={<IonIcon name="repeat-outline" />}
            >
              With actually received
            </Button>
          </Col>
          <Col span={24}>
            <Card
              className="order-confirm-card"
              bodyStyle={{ padding: 16 }}
              bordered={false}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <RowInfo label="Your send" value={bidVal} />
                </Col>
                <Col span={24}>
                  <MarketPrice />
                </Col>
                <Col span={24}>
                  <RowInfo label="Network fee" value={fee} />
                </Col>
                <Col span={24}>
                  <RowInfo label="Retailer fee" value={fee} />
                </Col>
                <Col span={24}>
                  <RowInfo label="Actually received" value={askAmount} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Button type="primary" block>
              Send
            </Button>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default Action
