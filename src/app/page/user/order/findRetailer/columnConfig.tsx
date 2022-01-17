import Tier from 'app/components/tier'
import { shortenAddress } from 'shared/util'
import ColumnAction from './columnAction'
import ColumnFee from './columnFee'

export const RETAILER_COLUMN = [
  {
    title: 'RETAILER',
    dataIndex: 'owner',
    render: (owner: string) => shortenAddress(owner),
  },
  {
    title: 'TIER',
    render: () => <Tier level={0} />,
  },
  {
    title: 'FEE',
    width: 100,
    dataIndex: 'address',
    render: (address: string) => <ColumnFee retailerAddress={address} />,
  },
  {
    title: 'ACTIONS',
    width: 100,
    dataIndex: 'address',
    render: (address: string) => <ColumnAction retailerAddress={address} />,
  },
]
