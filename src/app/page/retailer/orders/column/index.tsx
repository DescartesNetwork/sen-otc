import { Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ColumnStatus from 'app/components/columnStatus'

import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { shortenAddress } from 'shared/util'

export const ORDER_COLUMN = [
  {
    title: 'ORDER DAY',
    dataIndex: 'order_day',
    key: 'order_day',
  },

  {
    title: 'ORDER ID',
    dataIndex: 'order_id',
    key: 'order_id',
    render: (order_id: string) => (
      <Typography.Text>{shortenAddress(order_id)}</Typography.Text>
    ),
  },
  {
    title: 'PRICE',
    dataIndex: 'price',
    key: 'price',
    render: (text: string, record: any) => (
      <Space>
        10{' '}
        <MintSymbol
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
        <MintAvatar
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
        <IonIcon name="arrow-forward-outline" />
        <MintAvatar
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
        3000
        <MintSymbol
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
      </Space>
    ),
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
export const demoData = [
  {
    order_day: '161 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    state: 0,
  },
  {
    order_day: '162 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    state: 1,
  },
  {
    order_day: '163 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    state: 1,
  },
  {
    order_day: '164 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    state: 2,
  },
]
