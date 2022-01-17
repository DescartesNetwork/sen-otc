import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Table } from 'antd'
import { HISTORY_COLUMN } from './historyColumn'

import { AppState } from 'app/model'
import { FilterOrderSet } from 'app/constant'
import { useFilterOrders } from 'app/hooks/useFilter'

const ListOrders = ({ orderFilters }: { orderFilters: FilterOrderSet }) => {
  const { orders } = useSelector((state: AppState) => state)
  const listOrderAddress = useFilterOrders(orderFilters)

  const dataSource = useMemo(() => {
    return listOrderAddress?.map((addr) => {
      return { ...orders[addr], address: addr }
    })
  }, [listOrderAddress, orders])

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
}

export default ListOrders
