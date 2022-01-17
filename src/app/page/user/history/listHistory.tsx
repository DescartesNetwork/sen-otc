import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Table } from 'antd'
import { HISTORY_COLUMN } from './historyColumn'

import { AppState } from 'app/model'

const ListHistory = () => {
  const { orders } = useSelector((state: AppState) => state)

  const dataSource = useMemo(
    () =>
      Object.keys(orders).map((addr) => ({ ...orders[addr], address: addr })),
    [orders],
  )

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

export default ListHistory
