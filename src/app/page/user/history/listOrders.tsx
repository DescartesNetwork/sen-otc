import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useUI } from '@senhub/providers'

import { Col, Row, Table } from 'antd'
import { HISTORY_COLUMN } from './historyColumn'

import { AppState } from 'app/model'
import OrderCard from './orderCard'

const ListOrders = () => {
  const { orders } = useSelector((state: AppState) => state)
  const {
    ui: { width },
  } = useUI()

  const desktop = width > 1200

  const dataSource = useMemo(
    () =>
      Object.keys(orders).map((addr) => ({ ...orders[addr], address: addr })),
    [orders],
  )

  if (desktop)
    return (
      <Table
        className="scrollbar"
        columns={HISTORY_COLUMN}
        dataSource={dataSource}
        rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
        pagination={false}
        rowKey={(record) => `${record.address}`}
      />
    )
  return (
    <Row gutter={[24, 24]}>
      {dataSource.map((data) => (
        <Col span={24} key={data.address}>
          <OrderCard orderId={data.address} />
        </Col>
      ))}
    </Row>
  )
}

export default ListOrders
