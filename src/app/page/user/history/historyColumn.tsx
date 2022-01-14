import moment from 'moment'

import { Typography } from 'antd'
import Price from 'app/components/price'
import StatusTag from 'app/components/statusTags'
import ActionHistory from './actionHistory'

import { shortenAddress } from 'shared/util'

export const HISTORY_COLUMN = [
  {
    title: 'CREATED DAY',
    dataIndex: 'created_at',
    key: 'created_day',
    render: (time: string) => {
      return (
        <Typography.Text>
          {moment(Number(time) * 1000).format('MMM DD, YYYY HH:mm')}
        </Typography.Text>
      )
    },
  },
  {
    title: 'APPROVED DAY',
    dataIndex: 'approved_day',
    key: 'approved_day',
  },
  {
    title: 'ORDER ID',
    dataIndex: 'address',
    key: 'order_id',
    render: (orderId: string) => (
      <Typography.Text>{shortenAddress(orderId)}</Typography.Text>
    ),
  },
  {
    title: 'PRICE',
    dataIndex: 'address',
    key: 'price',
    render: (orderId: string) => <Price orderId={orderId} />,
  },
  {
    title: 'STATUS',
    dataIndex: 'state',
    key: 'state',
    render: (state: number) => <StatusTag state={state} />,
  },
  {
    title: 'ACTIONS',
    key: 'action',
    dataIndex: 'state',
    width: 100,
    render: (state: number) => <ActionHistory state={state} />,
  },
]
