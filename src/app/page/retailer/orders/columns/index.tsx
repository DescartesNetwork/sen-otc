import moment from 'moment'

import { Typography } from 'antd'

import ColumnBid from 'app/components/order/columnBid'
import ColumnAsk from 'app/components/order/columnAsk'

import { shortenAddress } from 'shared/util'
import RetailerAction from './action/retailerAction'
import ColumnProfit from './columnProfit'
import { OrderData } from '@senswap/sen-js'

export const ORDER_COLUMN = [
  {
    title: 'ORDER DAY',
    dataIndex: 'created_at',
    render: (time: bigint) => {
      return (
        <Typography.Text>
          {moment(Number(time) * 1000).format('MMM DD, YYYY HH:mm')}
        </Typography.Text>
      )
    },
    sorter: (a: OrderData, b: OrderData) =>
      Number(a.created_at) - Number(b.created_at),
  },
  {
    title: 'ORDER ID',
    dataIndex: 'address',
    render: (address: string) => (
      <Typography.Text>{shortenAddress(address)}</Typography.Text>
    ),
  },
  {
    title: 'FROM',
    dataIndex: 'address',
    render: (orderId: string) => <ColumnBid orderId={orderId} />,
    sorter: (a: OrderData, b: OrderData) =>
      Number(a.bid_amount) - Number(b.bid_amount),
  },
  {
    title: 'TO',
    dataIndex: 'address',
    render: (orderId: string) => <ColumnAsk orderId={orderId} />,
    sorter: (a: OrderData, b: OrderData) =>
      Number(a.ask_amount) - Number(b.ask_amount),
  },
  {
    title: 'PROFIT',
    dataIndex: 'address',
    render: (orderId: string) => <ColumnProfit orderAddress={orderId} />,
  },
  {
    title: 'ACTIONS',
    key: 'state',
    dataIndex: 'state',
    render: (state: number, record: any) => (
      <RetailerAction orderAddress={record.address} />
    ),
    sorter: (a: OrderData, b: OrderData) => a.state - b.state,
  },
]
