import { useState } from 'react'
import { useUI } from '@senhub/providers'

import { Col, Row, Typography, Table } from 'antd'
import OrderCard from 'app/page/retailer/orders/orderCard'
import { ORDER_COLUMN, demoData } from './column'

import FilterHistory from 'app/components/filterHistory'

const Order = () => {
  const [coin, setCoin] = useState('Select')
  const [time, setTime] = useState('Select')
  const [status, setStatus] = useState('Select')

  const {
    ui: { width, infix },
  } = useUI()
  const desktop = width > 1200
  const isMobile = infix === 'xs'
  const colSpan = !isMobile ? 24 : undefined
  const flexType = isMobile ? 'auto' : undefined

  console.log(colSpan)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={12} align="bottom">
          {!isMobile && (
            <Col flex="auto">
              <Row gutter={12}>
                <Col>
                  <FilterHistory
                    label="Coin"
                    value={coin}
                    onSelected={setCoin}
                  />
                </Col>
                <Col>
                  <FilterHistory
                    label="Time"
                    value={time}
                    onSelected={setTime}
                  />
                </Col>
                <Col>
                  <FilterHistory
                    label="Status"
                    value={status}
                    onSelected={setStatus}
                  />
                </Col>
              </Row>
            </Col>
          )}
          <Col>
            <Row style={{ textAlign: 'right' }}>
              <Col span={colSpan} flex={flexType}>
                <Typography.Text type="secondary">Market price</Typography.Text>
              </Col>
              <Col span={colSpan}>
                <Typography.Text>SNTR/USDC = 0.02567</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {desktop ? (
          <Table
            className="scrollbar"
            columns={ORDER_COLUMN}
            dataSource={demoData}
            rowClassName={(record, index) =>
              index % 2 ? 'odd-row' : 'even-row'
            }
            pagination={false}
            rowKey={(record) => record.order_day}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {demoData.map((data) => (
              <Col span={24} key={data.order_day}>
                <OrderCard orderId="9f9c4fw7dXg7titXKCUWbGPAG4M4miRqL236u4Fho3dF" />
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default Order
