import { useState } from 'react'

import { Col, Row, Space, Typography, Table } from 'antd'

import FilterHistory from 'app/components/filterHistory'
import { ORDER_COLUMN, demoData } from './column'

const Order = () => {
  const [coin, setCoin] = useState('Select')
  const [time, setTime] = useState('Select')
  const [status, setStatus] = useState('Select')
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={12}>
          <Col flex="auto">
            <Row gutter={12}>
              <Col>
                <FilterHistory label="Coin" value={coin} onSelected={setCoin} />
              </Col>
              <Col>
                <FilterHistory label="Time" value={time} onSelected={setTime} />
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
          rowKey={(record) => Number(record.order_day)}
        />
      </Col>
    </Row>
  )
}

export default Order
