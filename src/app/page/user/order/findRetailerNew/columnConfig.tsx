import { shortenAddress } from 'shared/util'
import ColumnAction from './columnAction'
import ColumnFee from './columnFee'
import ColumnRate from './columnRate'

export const RETAILER_COLUMN = [
  {
    title: 'RETAILER',
    dataIndex: 'owner',
    render: (owner: string) => shortenAddress(owner),
  },
  {
    title: 'FEE',
    width: 100,
    dataIndex: 'address',
    render: (address: string) => <ColumnFee retailerAddress={address} />,
  },
  {
    title: 'RATE',
    dataIndex: 'address',
    render: (address: string) => <ColumnRate retailerAddress={address} />,
  },
  {
    title: 'ACTIONS',
    width: 100,
    dataIndex: 'address',
    render: (address: string) => <ColumnAction retailerAddress={address} />,
  },
]
