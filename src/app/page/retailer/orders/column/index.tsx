import moment from 'moment'

import { Typography } from 'antd'
import ColumnStatus from 'app/components/columnStatus'
import Price from 'app/components/orderPrice'

import { shortenAddress } from 'shared/util'

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
    title: 'PRICE',
    dataIndex: 'address',
    key: 'price',
    render: (orderId: string) => <Price orderId={orderId} />,
  },

  {
    title: 'ACTIONS',
    key: 'state',
    dataIndex: 'state',
    render: (state: number, record: any) => (
      <ColumnStatus state={state} orderData={record} />
    ),
  },
]
