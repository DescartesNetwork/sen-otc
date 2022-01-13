import { useState } from 'react'

import { Button, Col, Card, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { numeric } from 'shared/util'
import IonIcon from 'shared/antd/ionicon'

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

const TimeInfo = ({
  label = '',
  value = '',
}: {
  label?: string
  value?: string | number
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>{value}</Typography.Text>
      </Col>
    </Row>
  )
}

const Confirm = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Content
              label="From"
              mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
              value={`${numeric(10).format('0,0.[0000]')} LP`}
            />
          </Col>
          <Col>
            <IonIcon name="arrow-forward-outline" />
          </Col>
          <Col>
            <Content
              label="To"
              mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
              value={numeric(1412.1241).format('0,0.[0000]')}
              floatRight
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card
          className="order-confirm-card"
          bodyStyle={{ padding: 16 }}
          bordered={false}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <TimeInfo label="Market price" value={'1 USD = 39.5 SNTR'} />
            </Col>
            <Col span={24}>
              <TimeInfo
                label="Network fee"
                value={numeric(1).format('0,0.[00]%')}
              />
            </Col>
            <Col span={24}>
              <TimeInfo
                label="Retailer fee"
                value={numeric(1).format('0,0.[00]%')}
              />
            </Col>
          </Row>
        </Card>
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
