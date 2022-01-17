import { useState } from 'react'

import { Col, Row, Space, Typography, Table } from 'antd'
import { ORDER_COLUMN, demoData } from './column'
import FilterHistory from 'app/components/filterHistory'

import { FilterOrderSet } from 'app/page/user/history'

const Order = () => {
  const [orderFilter, setOrderFilter] = useState<FilterOrderSet>({
    coin: 'All',
    time: 7,
    status: 'All',
  })
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={12}>
          <Col flex="auto">
            <Row gutter={12}>
              <FilterHistory
                onSelect={(value) => {
                  setOrderFilter(value)
                }}
                filterValues={orderFilter}
              />
            </Row>
          </Col>
          <Col>
            <Space direction="vertical" align="end">
              <Typography.Text type="secondary">Market price</Typography.Text>
              <Typography.Text>SNTR/USDC = 0.02567</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          className="scrollbar"
          columns={ORDER_COLUMN}
          dataSource={demoData}
          rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
          pagination={false}
          rowKey={(record) => record.order_day}
        />
      </Col>
    </Row>
  )
}

export default Order
