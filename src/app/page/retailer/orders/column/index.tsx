import moment from 'moment'

import { Typography } from 'antd'

import ColumnBid from 'app/components/order/columnBid'
import ColumnAsk from 'app/components/order/columnAsk'

import { shortenAddress } from 'shared/util'
import RetailerAction from './action/retailerAction'

export const ORDER_COLUMN = [
  {
    title: 'ORDER DAY',
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
  },
  {
    title: 'TO',
    dataIndex: 'address',
    render: (orderId: string) => <ColumnAsk orderId={orderId} />,
  },
  {
    title: 'ACTIONS',
    key: 'state',
    dataIndex: 'state',
    render: (state: number, record: any) => (
      <RetailerAction orderAddress={record.address} />
    ),
  },
]
