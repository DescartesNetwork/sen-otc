import moment from 'moment'

import { Typography } from 'antd'
import OrderStatus from 'app/components/order/status'
import ColumnBid from 'app/components/order/columnBid'
import ColumnAsk from 'app/components/order/columnAsk'
import ColumnAction from './actions'

import { shortenAddress } from 'shared/util'

const MILLISECOND_PER_DAY = 84000000

export const HISTORY_COLUMN = [
  {
    title: 'ORDER ID',
    dataIndex: 'address',
    render: (orderId: string) => (
      <Typography.Text>{shortenAddress(orderId)}</Typography.Text>
    ),
  },
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
      const updateTime = Number(time) * 1000
      const isNew = new Date().getTime() - updateTime < 2 * MILLISECOND_PER_DAY
      return (
        <Typography.Text style={{ color: isNew ? '#d4b106' : undefined }}>
          {moment(updateTime).format('MMM DD, YYYY HH:mm')}
        </Typography.Text>
      )
    },
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
