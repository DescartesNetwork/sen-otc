import Tier from 'app/components/tier'
import SelectRetailer from './actionSelectRetailer'

export const RETAILER_COLUMN = [
  {
    title: 'RETAILER',
    dataIndex: 'retailer',
    key: 'retailer',
  },
  {
    title: 'TIER',
    dataIndex: 'tier',
    key: 'tier',
    render: (tier: number) => <Tier tier={tier} />,
  },
  {
    title: 'FEE',
    dataIndex: 'fee',
    key: 'fee',
    width: 100,
  },
  {
    title: 'ACTIONS',
    key: 'state',
    dataIndex: 'state',
    width: 100,
    render: () => <SelectRetailer />,
  },
]
export const demoData = [
  {
    fee: 0.001,
    retailer: '0x12..aBs',
    state: 1,
    tier: 0,
  },
  {
    fee: 0.002,
    retailer: '0x12..aBs',
    state: 1,
    tier: 0,
  },
  {
    fee: 0.0015,
    retailer: '0x12..aBs',
    state: 1,
    tier: 2,
  },
  {
    fee: 0.0021,
    retailer: '0x12..aBs',
    state: 1,
    tier: 1,
  },
  {
    fee: 0.0021,
    retailer: '0x12..aBs',
    state: 1,
    tier: 3,
  },
]
