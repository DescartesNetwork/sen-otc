import moment from 'moment'

import { Typography } from 'antd'
import OrderStatus from 'app/components/order/status'
import ColumnBid from 'app/components/order/columnBid'
import ColumnAsk from 'app/components/order/columnAsk'
import ColumnAction from './actions'

import { shortenAddress } from 'shared/util'
import { OrderData } from '@senswap/sen-js'

const MILLISECOND_PER_DAY = 84000000

export const HISTORY_COLUMN = [
  {
    title: 'CREATED DAY',
    dataIndex: 'created_at',
    render: (time: string) => {
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
    title: 'UPDATED DAY',
    dataIndex: 'updated_at',
    render: (time: bigint) => {
      const updateTime = Number(time) * 1000
      const isNew = new Date().getTime() - updateTime < MILLISECOND_PER_DAY
      return (
        <Typography.Text style={{ color: isNew ? '#d4b106' : undefined }}>
          {moment(updateTime).format('MMM DD, YYYY HH:mm')}
        </Typography.Text>
      )
    },
    sorter: (a: OrderData, b: OrderData) =>
      Number(a.updated_at) - Number(b.updated_at),
  },
  {
    title: 'ORDER ID',
    dataIndex: 'address',
    render: (orderId: string) => (
      <Typography.Text>{shortenAddress(orderId)}</Typography.Text>
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
    title: 'STATUS',
    dataIndex: 'address',
    render: (orderAddress: string) => (
      <OrderStatus orderAddress={orderAddress} />
    ),
    sorter: (a: OrderData, b: OrderData) => a.state - b.state,
  },
  {
    title: 'ACTIONS',
    dataIndex: 'address',
    width: 100,
    render: (address: string) => <ColumnAction orderAddress={address} />,
  },
]
