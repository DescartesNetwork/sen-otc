import { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { Button, Card, Col, Collapse, Row, Space, Typography } from 'antd'
import StatusTag from 'app/components/statusTags'
import OrderPriceCell from 'app/components/orderPriceCell'
import ColumnAction from './columnAction'
import { AppState } from 'app/model'
import { MintAvatar } from 'shared/antd/mint'
import IonIcon from 'shared/antd/ionicon'
import { shortenAddress } from 'shared/util'

const Content = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <Row>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>{value}</Typography.Text>
      </Col>
    </Row>
  )
}

const OrderCard = ({ orderId }: { orderId: string }) => {
  const [activeKey, setActiveKey] = useState<string | undefined>()
  const {
    orders: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)
  const retailerData = retailers?.[orderData.retailer]
  const { bid_amount, ask_amount, created_at } = orderData
  const { mint_ask, mint_bid, state } = retailerData || {}

  const iconName = activeKey ? 'chevron-up-outline' : 'chevron-down-outline'
  const getDate = (date?: BigInt | string) => {
    if (date) return moment(Number(date) * 1000).format('MMM DD, YYYY HH:mm')
    return '--:--:--'
  }
  const onActive = () => {
    if (activeKey) return setActiveKey(undefined)
    return setActiveKey(orderId)
  }

  return (
    <Card
      className="order-otc-card"
      bordered={false}
      bodyStyle={{ padding: 16 }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col flex="auto">
              <Space direction="vertical" size={6}>
                <Space>
                  <MintAvatar mintAddress={mint_bid} size={20} />
                  <OrderPriceCell mintAddress={mint_bid} amount={bid_amount} />
                </Space>
                <IonIcon name="arrow-down-outline" />
                <Space>
                  <MintAvatar mintAddress={mint_ask} size={20} />
                  <OrderPriceCell mintAddress={mint_ask} amount={ask_amount} />
                </Space>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical" size={16}>
                <StatusTag state={state} />
                <ColumnAction orderAddress={orderId} />
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <Col span={24} className="order-collapse">
              <Collapse activeKey={activeKey} bordered={false}>
                <Collapse.Panel header={false} key={orderId} showArrow={false}>
                  <Row gutter={[6, 6]}>
                    <Col span={24}>
                      <Content label="Create Day" value={getDate(created_at)} />
                    </Col>
                    <Col span={24}>
                      <Content
                        label="Approved Day"
                        value={getDate(undefined)}
                      />
                    </Col>
                    <Col span={24}>
                      <Content
                        label="Order ID"
                        value={shortenAddress(orderId)}
                      />
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col>
              <Button
                type="text"
                size="small"
                icon={<IonIcon name={iconName} />}
                onClick={onActive}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
export default OrderCard
