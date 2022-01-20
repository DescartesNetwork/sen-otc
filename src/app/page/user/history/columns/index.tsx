import moment from 'moment'

import { Typography } from 'antd'
import OrderStatus from 'app/components/order/status'
import ColumnBid from 'app/components/order/columnBid'
import ColumnAsk from '../../../../components/order/columnAsk'
import ColumnAction from './actions'

import { shortenAddress } from 'shared/util'

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
  },
  {
    title: 'UPDATED DAY',
    dataIndex: 'updated_at',
    render: (time: bigint) => {
      return (
        <Typography.Text>
          {moment(Number(time) * 1000).format('MMM DD, YYYY HH:mm')}
        </Typography.Text>
      )
    },
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
  },
  {
    title: 'TO',
    dataIndex: 'address',
    render: (orderId: string) => <ColumnAsk orderId={orderId} />,
  },
  {
    title: 'STATUS',
    dataIndex: 'address',
    render: (orderAddress: string) => (
      <OrderStatus orderAddress={orderAddress} />
    ),
  },
  {
    title: 'ACTIONS',
    dataIndex: 'address',
    width: 100,
    render: (address: string) => <ColumnAction orderAddress={address} />,
  },
]
