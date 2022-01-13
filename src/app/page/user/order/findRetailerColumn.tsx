import { Typography } from 'antd'
import Tier from 'app/components/tier'
import SelectRetailer from './actionSelectRetailer'

export const RETAILER_COLUMN = [
  {
    title: 'RETAILER',
    dataIndex: 'owner',
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
    render: () => <SelectRetailer />,
  },
]
