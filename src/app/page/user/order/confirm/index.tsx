import { useState } from 'react'

import { Button, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { numeric } from 'shared/util'
import IonIcon from 'shared/antd/ionicon'
import { AppState } from 'app/model'
import { useSelector } from 'react-redux'
import OrderInfo from './orderInfo'

const Content = ({
  label = '',
  mintAddress,
  value = '',
  floatRight = false,
}: {
  label?: string
  mintAddress: string
  value?: string | number
  floatRight?: boolean
}) => {
  const textAlign = floatRight ? 'right' : 'left'
  return (
    <Space size={8} direction="vertical" style={{ textAlign }}>
      <Typography.Text>{label}</Typography.Text>
      <Space>
        <MintAvatar mintAddress={mintAddress} />
        <MintSymbol mintAddress={mintAddress} />
      </Space>
      <Typography.Title level={3}>{value}</Typography.Title>
    </Space>
  )
}

const Confirm = () => {
  const [loading, setLoading] = useState(false)
  const {
    order: { bidMintAddress, askMintAddress, bidAmount, askAmount },
  } = useSelector((state: AppState) => state)
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Content
              label="From"
              mintAddress={bidMintAddress}
              value={`${numeric(bidAmount).format('0,0.[0000]')} LP`}
            />
          </Col>
          <Col>
            <IonIcon name="arrow-forward-outline" />
          </Col>
          <Col>
            <Content
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
        <Button
          type="primary"
          onClick={() => setLoading}
          loading={loading}
          block
        >
          Confirm
        </Button>
      </Col>
    </Row>
  )
}
export default Confirm
