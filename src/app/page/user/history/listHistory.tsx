import { useMemo } from 'react'

import { Table } from 'antd'
import { AppState } from 'app/model'
import { useSelector } from 'react-redux'
import { HISTORY_COLUMN } from './historyColumn'

const ListHistory = () => {
  const { history } = useSelector((state: AppState) => state)
  const dataSource = useMemo(
    () =>
      Object.keys(history).map((addr) => ({ ...history[addr], address: addr })),
    [history],
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
