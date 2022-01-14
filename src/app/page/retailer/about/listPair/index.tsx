import { Table } from 'antd'
import { PAIR_COLUMN, demoData } from './column'
const ListPair = () => {
  return (
    <Table
      className="scrollbar"
      columns={PAIR_COLUMN}
      dataSource={demoData}
      rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
      pagination={false}
      rowKey={(record) => record.key}
    />
  )
}

export default ListPair
