import { Table } from 'antd'
import { demoData, RETAILER_COLUMN } from './retailerTableColumn'

const FindRetailer = () => {
  return (
    <Table
      className="scrollbar"
      columns={RETAILER_COLUMN}
      dataSource={demoData}
      rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
      pagination={false}
      scroll={{ y: 572 }}
      rowKey={(record) => Number(record.tier + record.fee)}
    />
  )
}

export default FindRetailer
