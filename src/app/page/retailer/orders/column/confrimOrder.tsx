import { useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import moment from 'moment'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { notifyError, notifySuccess } from 'app/helper'
import { AppState } from 'app/model'
import configs from 'app/configs'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { numeric } from 'shared/util'
import { useMarketPrice } from 'app/hooks/useMarketPrice'

const {
  sol: { purchasing },
} = configs

const ConfirmOrder = ({
  orderAddress,
  setVisible,
}: {
  orderAddress: string
  setVisible: (visible: boolean) => void
}) => {
  const [ldApprove, setLdApprove] = useState(false)
  const [ldReject, setLdReject] = useState(false)
  const {
    orders: { [orderAddress]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)

  const retailerData = retailers[orderData?.retailer]
  const { bid_amount, ask_amount } = orderData
  const { mint_ask, mint_bid } = retailerData
  const bidDecimals = useMintDecimals(mint_bid) || 0
  const askDecimals = useMintDecimals(mint_ask) || 0
  const { marketPrice } = useMarketPrice(mint_bid, mint_ask)

  const onApprove = async () => {
    try {
      setLdApprove(true)
      const wallet = window.sentre.wallet
      if (!wallet) return notifyError({ message: 'Wallet is not connected!' })
      const { txId } = await purchasing.approveOrder(orderAddress, wallet)
      notifySuccess('Approve', txId)
    } catch (er) {
      notifyError(er)
    } finally {
      setLdApprove(false)
      setVisible(false)
    }
  }

  const onReject = async () => {
    try {
      setLdReject(true)
      const wallet = window.sentre.wallet
      if (!wallet) return notifyError({ message: 'Wallet is not connected!' })
      const { txId } = await purchasing.rejectOrder(orderAddress, wallet)
      notifySuccess('Reject', txId)
    } catch (er) {
      notifyError(er)
    } finally {
      setLdReject(false)
      setVisible(false)
    }
  }
  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row align="middle" justify="space-between">
          <Col>
            <Space direction="vertical">
              <Typography.Text>Pay</Typography.Text>
              <Space>
                <MintAvatar mintAddress={mint_bid} />
                <Typography.Text>
                  <MintSymbol mintAddress={mint_bid} />
                </Typography.Text>
              </Space>
              <Typography.Title level={4}>
                {numeric(utils.undecimalize(bid_amount, bidDecimals)).format(
                  '0,0.[0000]',
                )}
              </Typography.Title>
            </Space>
          </Col>
          <Col>
            <IonIcon name="arrow-forward-outline" style={{ fontSize: 24 }} />
          </Col>
          <Col>
            <Space direction="vertical">
              <Typography.Text>Receive</Typography.Text>
              <Space>
                <MintAvatar mintAddress={mint_ask} />
                <Typography.Text>
                  <MintSymbol separator=" + " mintAddress={mint_ask} />
                </Typography.Text>
              </Space>
              <Typography.Title level={4}>
                {' '}
                {numeric(utils.undecimalize(ask_amount, askDecimals)).format(
                  '0,0.[0000]',
                )}
              </Typography.Title>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card
          bordered={false}
          className="order-confirm-card"
          style={{ boxShadow: 'none', borderRadius: 8 }}
          bodyStyle={{ padding: 16 }}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Approve day
                  </Typography.Text>
                </Col>
                <Typography.Text>
                  {moment().format('MM/DD/YYYY')}
                </Typography.Text>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Market price
                  </Typography.Text>
                </Col>
                <Typography.Text>
                  <MintSymbol mintAddress={mint_bid} /> ={' '}
                  {numeric(marketPrice).format('0,0.[00]')}{' '}
                  <MintSymbol mintAddress={mint_ask} />
                </Typography.Text>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Network fee
                  </Typography.Text>
                </Col>
                <Col>0.0001%</Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space size={4}>
          <Button onClick={onReject} loading={ldReject}>
            Reject
          </Button>
          <Button onClick={onApprove} loading={ldApprove} type="primary">
            Approve
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default ConfirmOrder
