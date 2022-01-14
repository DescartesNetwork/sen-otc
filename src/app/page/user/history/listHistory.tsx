import { utils } from '@senswap/sen-js'
import { Table } from 'antd'
import { AppState } from 'app/model'
import { HistoryOTC } from 'app/model/history.controller'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HISTORY_COLUMN } from './historyColumn'

// const ROW_PER_PAGE = 5

const ListHistory = () => {
  // const [amountRow, setAmountRow] = useState(ROW_PER_PAGE)
  const [dataSource, setDataSource] = useState<HistoryOTC[]>([])

  const { history } = useSelector((state: AppState) => state)
  // history.slice(0, amountRow).map((addr) => history[addr])
  useEffect(() => {
    ;(async () => {
      const data: HistoryOTC[] = await Object.keys(history).map((addr) => ({
        created_day: utils.undecimalize(BigInt(history[addr].created_at), 0),
        approved_day: '',
        order_id: addr,
        price: addr,
        state: history[addr].state,
        action: history[addr].state,
      }))
      setDataSource(data)
    })()
  }, [history])

  return (
    <Table
      className="scrollbar"
      columns={HISTORY_COLUMN}
      dataSource={dataSource}
      rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
      pagination={false}
      rowKey={(record) => record.order_id}
    />
  )
}

export default ListHistory
