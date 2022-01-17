import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Table } from 'antd'
import { HISTORY_COLUMN } from './historyColumn'

import { AppState } from 'app/model'
import { FilterOrderSet, ORDER_STATE_DIGIT } from 'app/constant'

const ListOrders = ({ orderFilters }: { orderFilters: FilterOrderSet }) => {
  const { orders, retailers } = useSelector((state: AppState) => state)

  const { time, status, coin } = orderFilters

  const filter = useCallback(
    (addr: string) => {
      const coinCheck =
        coin !== 'All'
          ? retailers[orders[addr].retailer].mint_ask === coin ||
            retailers[orders[addr].retailer].mint_bid === coin
          : true
      const statusCheck =
        status !== 'ALL'
          ? ORDER_STATE_DIGIT[orders[addr].state] === status
          : true
      const timeCheck =
        Date.now() / 1000 -
          Number(utils.undecimalize(orders[addr].created_at, 0)) <
        time * 86400
      return statusCheck && timeCheck && coinCheck
    },
    [coin, orders, retailers, status, time],
  )

  const dataSource = useMemo(
    () =>
      Object.keys(orders)
        .filter((addr) => {
          return filter(addr)
        })
        .map((addr) => {
          return { ...orders[addr], address: addr }
        }),
    [filter, orders],
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

export default ListOrders
