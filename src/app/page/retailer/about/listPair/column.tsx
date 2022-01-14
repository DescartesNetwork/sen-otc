import { Button, Space } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

export const PAIR_COLUMN = [
  {
    title: 'FROM',
    dataIndex: 'from',
    key: 'from',
    render: () => (
      <Space>
        <MintSymbol
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
        <MintAvatar
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
      </Space>
    ),
  },

  {
    title: 'TO',
    dataIndex: 'to',
    key: 'to',
    render: () => (
      <Space>
        <MintSymbol
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
        <MintAvatar
          mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
        />
      </Space>
    ),
  },
  {
    title: 'FEE',
    dataIndex: 'fee',
    key: 'fee',
  },

  {
    title: 'ACTIONS',
    key: 'state',
    dataIndex: 'state',
    render: () => <Button type="text"> Delete</Button>,
  },
]
export const demoData = [
  {
    from: '161 Nov, 2021 16:00',
    to: '0x12..aBs',
    fee: '0.001%',
    key: 0,
  },
  {
    from: '161 Nov, 2021 16:00',
    to: '0x12..aBs',
    fee: '0.001%',
    key: 1,
  },
  {
    from: '161 Nov, 2021 16:00',
    to: '0x12..aBs',
    fee: '0.001%',
    key: 2,
  },
  {
    from: '161 Nov, 2021 16:00',
    to: '0x12..aBs',
    fee: '0.001%',
    key: 3,
  },
]
