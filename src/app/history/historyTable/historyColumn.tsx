import type { ColumnsType } from 'antd/es/table'
import BN from 'bn.js'

import { Typography } from 'antd'
import { Title } from 'components/table/title'
import { Datetime } from 'components/table/datetime'
import { Io } from 'components/table/io'
import { OfferedPrice } from 'components/table/price'

import { explorer, shortenAddress } from 'helpers/util'

export type HistoryType = {
  key: string
  time: number
  io: Record<string, BN>
  orderAddress: string
}

const HistoryColumn: ColumnsType<HistoryType> = [
  {
    title: <Title title="OFFER ID" />,
    dataIndex: 'orderAddress',
    key: 'offer',
    render: (orderAddress) => (
      <Typography.Link href={explorer(orderAddress)} target="_blank">
        {shortenAddress(orderAddress)}
      </Typography.Link>
    ),
  },
  {
    title: <Title title="IN/OUT" />,
    dataIndex: 'io',
    key: 'io',
    render: (io) => <Io io={io} />,
  },
  {
    title: <Title title="PRICE" />,
    dataIndex: 'orderAddress',
    key: 'price',
    render: (orderAddress) => <OfferedPrice orderAddress={orderAddress} />,
  },
  {
    title: <Title title="TIME" />,
    dataIndex: 'time',
    key: 'time',
    render: (time) => <Datetime timestamp={time} />,
  },
  {
    title: <Title title="TXID" />,
    dataIndex: 'key',
    key: 'key',
    render: (key) => (
      <Typography.Link href={explorer(key)} target="_blank">
        {shortenAddress(key)}
      </Typography.Link>
    ),
  },
]

export default HistoryColumn
