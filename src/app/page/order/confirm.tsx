import { Fragment, ReactNode, useState } from 'react'
import moment from 'moment'

import { Button, Col, Card, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { numeric } from 'shared/util'
import IonIcon from 'shared/antd/ionicon'

const Content = ({
  label = '',
  avatar = <Fragment />,
  value = '',
  floatRight = false,
}: {
  label?: string
  avatar?: ReactNode
  value?: string | number
  subValue?: string | number | undefined
  floatRight?: boolean
}) => {
  const textAlign = floatRight ? 'right' : 'left'
  return (
    <Space size={12} direction="vertical" style={{ textAlign }}>
      <Typography.Text>{label}</Typography.Text>
      {avatar}
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
        <Typography.Text>{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Title level={5}>{value}</Typography.Title>
      </Col>
    </Row>
  )
}

const Confirm = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={5}>Confirm</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Content
              label="From"
              avatar={
                <Space>
                  <MintAvatar
                    mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
                  />
                  <Typography.Title level={5}>
                    <MintSymbol
                      mintAddress={
                        '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'
                      }
                    />
                  </Typography.Title>
                </Space>
              }
              value={`${numeric(10).format('0,0.[0000]')} LP`}
            />
          </Col>
          <Col>
            <IonIcon name="arrow-forward-outline" />
          </Col>
          <Col>
            <Content
              label="To"
              avatar={
                <Space>
                  <MintAvatar
                    mintAddress={'27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c'}
                  />
                  <Typography.Title level={5}>
                    <MintSymbol
                      mintAddress={
                        '27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c'
                      }
                    />
                  </Typography.Title>
                </Space>
              }
              value={numeric(1412.1241).format('0,0.[0000]')}
              subValue={numeric(41231.123).format('0,0.[0000]')}
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
              <TimeInfo
                label="Created At"
                value={moment().format('HH:mm DD/MM/YYYY')}
              />
            </Col>
            <Col span={24}>
              <TimeInfo label="Locked Time" value={`${1} Days`} />
            </Col>
            <Col span={24}>
              <TimeInfo label="Multiplier" value={0} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={() => {}} loading={loading} block>
          Confirm
        </Button>
      </Col>
    </Row>
  )
}
export default Confirm
