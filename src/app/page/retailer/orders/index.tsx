import { useState } from 'react'
import { useUI } from '@senhub/providers'

import { Col, Row, Typography, Table } from 'antd'
import { ORDER_COLUMN, demoData } from './column'
import FilterHistory from 'app/components/filterHistory'
import OrderCard from 'app/page/retailer/orders/orderCard'

import { FilterOrderSet } from 'app/constant'

const Order = () => {
  const [orderFilter, setOrderFilter] = useState<FilterOrderSet>({
    coin: 'All',
    time: 7,
    status: 'All',
  })
  const {
    ui: { width, infix },
  } = useUI()
  const desktop = width > 1200
  const isMobile = infix === 'xs'
  const colSpan = isMobile ? 24 : undefined
  const flexType = isMobile ? 'auto' : undefined

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={12} align="bottom">
          {!isMobile && (
            <Col flex="auto">
              <FilterHistory
                onSelect={(value) => {
                  setOrderFilter(value)
                }}
                filterValues={orderFilter}
              />
            </Col>
          )}
          <Col span={colSpan}>
            <Row justify="end">
              <Col flex={flexType}>
                <Typography.Text type="secondary">Market price</Typography.Text>
              </Col>
              {!isMobile && <Col span={24} />}
              <Col>
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
