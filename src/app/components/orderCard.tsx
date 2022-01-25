import { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { Button, Card, Col, Collapse, Row, Space, Typography } from 'antd'
import ColumnAction from '../page/user/history/columns/actions'
import OrderStatus from 'app/components/order/status'
import OrderMintInfo from 'app/components/orderMintInfo'
import IonIcon from 'shared/antd/ionicon'

import { explorer, shortenAddress } from 'shared/util'
import { AppState } from 'app/model'

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

const OrderCard = ({
  orderId,
  widget = false,
}: {
  orderId: string
  widget?: boolean
}) => {
  const [activeKey, setActiveKey] = useState<string | undefined>()
  const {
    orders: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)
  const retailerData = retailers?.[orderData.retailer]
  const { bid_amount, ask_amount, created_at, updated_at } = orderData
  const { mint_ask, mint_bid } = retailerData || {}

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
      className={widget ? 'order-otc-card-widget' : 'order-otc-card'}
      bordered={false}
      bodyStyle={{ padding: 16 }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col flex="auto">
              <Space direction="vertical" size={6}>
                {widget && (
                  <Space size={4}>
                    <Typography.Text type="secondary">
                      Order ID:
                    </Typography.Text>
                    <Typography.Text
                      style={{ cursor: 'pointer' }}
                      underline
                      onClick={() => window.open(explorer(orderId))}
                    >
                      {shortenAddress(orderId)}
                    </Typography.Text>
                  </Space>
                )}
                <OrderMintInfo
                  mintAddress={mint_bid}
                  amount={bid_amount}
                  size={20}
                />
                <IonIcon name="arrow-down-outline" />
                <OrderMintInfo
                  mintAddress={mint_ask}
                  amount={ask_amount}
                  size={20}
                />
              </Space>
            </Col>
            <Col>
              <Space direction="vertical" size={16}>
                <OrderStatus orderAddress={orderId} />
                <ColumnAction orderAddress={orderId} />
              </Space>
            </Col>
          </Row>
        </Col>
        {!widget && (
          <Col span={24}>
            <Row justify="center">
              <Col span={24} className="order-collapse">
                <Collapse activeKey={activeKey} bordered={false}>
                  <Collapse.Panel
                    header={false}
                    key={orderId}
                    showArrow={false}
                  >
                    <Row gutter={[6, 6]}>
                      <Col span={24}>
                        <Content
                          label="Created at"
                          value={getDate(created_at)}
                        />
                      </Col>
                      <Col span={24}>
                        <Content
                          label="Last updated"
                          value={getDate(updated_at)}
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
        )}
      </Row>
    </Card>
  )
}
export default OrderCard
