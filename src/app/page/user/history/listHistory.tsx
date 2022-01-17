import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Table } from 'antd'
import { HISTORY_COLUMN } from './historyColumn'

import { AppState } from 'app/model'
import { FilterOrderSet, ORDER_STATE_DIGIT } from 'app/constant'

const ListHistory = ({ orderFilters }: { orderFilters: FilterOrderSet }) => {
  const { history, retailers } = useSelector((state: AppState) => state)

  const { time, status, coin } = orderFilters

  const filter = useCallback(
    (addr: string) => {
      const coinCheck =
        coin !== 'All'
          ? retailers[history[addr].retailer].mint_ask === coin ||
            retailers[history[addr].retailer].mint_bid === coin
          : true
      const statusCheck =
        status !== 'ALL'
          ? ORDER_STATE_DIGIT[history[addr].state] === status
          : true
      const timeCheck =
        Date.now() / 1000 -
          Number(utils.undecimalize(history[addr].created_at, 0)) <
        time * 86400
      return statusCheck && timeCheck && coinCheck
    },
    [coin, history, retailers, status, time],
  )

  const dataSource = useMemo(
    () =>
      Object.keys(history)
        .filter((addr) => {
          return filter(addr)
        })
        .map((addr) => {
          return { ...history[addr], address: addr }
        }),
    [filter, history],
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
