import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useUI } from '@senhub/providers'
import { utils } from '@senswap/sen-js'

import { Col, Row, Table } from 'antd'
import { HISTORY_COLUMN } from './historyColumn'
import OrderCard from './orderCard'

import { AppState } from 'app/model'
import { FilterOrderSet, ORDER_STATE_CODE } from 'app/constant'
import { useFilterOrders } from 'app/hooks/useFilter'

const ListOrders = ({ orderFilters }: { orderFilters: FilterOrderSet }) => {
  const { orders } = useSelector((state: AppState) => state)
  const listOrderAddress = useFilterOrders(orderFilters)
  const {
    ui: { width },
  } = useUI()

  const desktop = width > 1200

  const dataSource = useMemo(() => {
    return listOrderAddress
      ?.map((addr) => {
        return { ...orders[addr], address: addr }
      })
      .sort((order1, order2) => {
        const orderState1Check = [
          ORDER_STATE_CODE.PENDING,
          ORDER_STATE_CODE.APPROVED,
        ].includes(order1.state)
        const orderState2Check = [
          ORDER_STATE_CODE.PENDING,
          ORDER_STATE_CODE.APPROVED,
        ].includes(order2.state)
        const timeCheck =
          Number(utils.undecimalize(order2.created_at, 0)) -
          Number(utils.undecimalize(order1.created_at, 0))

        if (orderState1Check && orderState2Check) {
          return timeCheck
        }
        if (orderState1Check && !orderState2Check) {
          return -1
        }
        if (!orderState1Check && orderState2Check) {
          return 1
        }
        return timeCheck
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
