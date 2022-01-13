import { Typography } from 'antd'
import Tier from 'app/components/tier'
import { shortenAddress } from 'shared/util'
import { RetailerTableData } from '.'
import ColumnAction from './columnAction'

export const RETAILER_COLUMN = [
  {
    title: 'RETAILER',
    dataIndex: 'owner',
    render: (owner: string) => shortenAddress(owner),
  },
  {
    title: 'TIER',
    render: () => <Tier tier={0} />,
  },
  {
    title: 'FEE',
    width: 100,
    render: () => <Typography.Text>0.01</Typography.Text>,
  },
  {
    title: 'ACTIONS',
    width: 100,
    render: (data: RetailerTableData) => (
      <ColumnAction retailerAddress={data.address} />
    ),
  },
]
