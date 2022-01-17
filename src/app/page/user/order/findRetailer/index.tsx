import { RetailerData } from '@senswap/sen-js'
import { Table } from 'antd'
import { useFoundRetailer } from 'app/hooks/useFoundRetailer'
import { useMemo } from 'react'
import { RETAILER_COLUMN } from './columnConfig'

const FindRetailer = () => {
  const { foundRetailer } = useFoundRetailer()

  const dataTable = useMemo(() => {
    const newDataTable: (RetailerData & { address: string })[] = []
    for (const address in foundRetailer) {
      newDataTable.push({
        ...foundRetailer[address],
        address,
      })
    }
    return newDataTable
  }, [foundRetailer])

  return (
    <Table
      className="scrollbar"
      columns={RETAILER_COLUMN}
      dataSource={dataTable}
      rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
      pagination={false}
      scroll={{ y: 572 }}
      rowKey={(record) => record.address}
    />
  )
}

export default FindRetailer
