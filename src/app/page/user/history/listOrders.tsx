import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useUI } from '@senhub/providers'

import { Col, Row, Table } from 'antd'
import { HISTORY_COLUMN } from './historyColumn'

import { AppState } from 'app/model'
import { FilterOrderSet } from 'app/constant'
import { useFilterOrders } from 'app/hooks/useFilter'
import OrderCard from './orderCard'

const ListOrders = ({ orderFilters }: { orderFilters: FilterOrderSet }) => {
  const { orders } = useSelector((state: AppState) => state)
  const listOrderAddress = useFilterOrders(orderFilters)
  const {
    ui: { width },
  } = useUI()

  const desktop = width > 1200

  const dataSource = useMemo(() => {
    return (
      listOrderAddress?.map((addr) => {
        return { ...orders[addr], address: addr }
      }) || []
    )
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
