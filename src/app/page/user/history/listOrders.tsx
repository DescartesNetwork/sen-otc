import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useUI } from '@senhub/providers'

import { Col, Row, Table } from 'antd'
import { HISTORY_COLUMN } from './columns'
import OrderCard from '../../../components/orderCard'

import { AppState } from 'app/model'
import { OrderFilterOptions } from 'app/constant'
import { ORDER_STATE_CODE } from 'app/constant/order'
import { useFilteredOrders } from 'app/hooks/useFilteredOrders'

const ListOrders = ({ orderFilters }: { orderFilters: OrderFilterOptions }) => {
  const { orders } = useSelector((state: AppState) => state)
  const listOrderAddress = useFilteredOrders(orderFilters)
  const {
    ui: { width },
  } = useUI()

  const desktop = width > 1200

  const dataSource = useMemo(() => {
    return listOrderAddress
      .map((addr) => {
        return { ...orders[addr], address: addr }
      })
      .sort((orderA, orderB) => {
        const priorityCodes = [
          ORDER_STATE_CODE.APPROVED,
          ORDER_STATE_CODE.PENDING,
        ]

        const priorityA = Number(priorityCodes.includes(orderA.state))
        const priorityB = Number(priorityCodes.includes(orderB.state))
        const point = priorityA + priorityB

        if (point === 2 || !point)
          return Number(orderB.created_at) - Number(orderA.created_at)
        return orderA.state - orderB.state
      })
  }, [listOrderAddress, orders])

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
