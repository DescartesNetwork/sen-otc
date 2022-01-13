import { Table } from 'antd'
import { demoData, HISTORY_COLUMN } from './historyColumn'

const ListHistory = () => {
  return (
    <Table
      className="scrollbar"
      columns={HISTORY_COLUMN}
      dataSource={demoData}
      rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
      pagination={false}
      rowKey={(record) => record.created_day}
    />
  )
}

export default ListHistory
