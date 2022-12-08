import { OrderData } from '@sentre/otc'
import type { ColumnsType } from 'antd/es/table'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'

import { Badge, Space } from 'antd'
import { Address } from 'components/table/address'
import { Title } from 'components/table/title'
import { Token } from 'components/table/token'
import { Datetime } from 'components/table/datetime'
import { OfferedPrice } from 'components/table/price'
import { Status } from 'components/table/status'

const OfferColumns: ColumnsType<OrderData & { key: string }> = [
  {
    title: <Title title="ADDRESS" />,
    dataIndex: 'key',
    key: 'key',
    render: (key: string) => <Address address={key} />,
  },
  {
    title: <Title title="DATETIME" />,
    dataIndex: 'startDate',
    key: 'startDate',
    render: (startDate: BN, { endDate }: OrderData & { key: string }) => {
      return (
        <Space direction="vertical" size={0}>
          <Space>
            <Badge status="error" />
            <Datetime timestamp={endDate.toNumber() * 1000} />
          </Space>
          <Space>
            <Badge status="success" />
            <Datetime timestamp={startDate.toNumber() * 1000} />
          </Space>
        </Space>
      )
    },
  },
  {
    title: <Title title="STATUS" />,
    dataIndex: 'key',
    key: 'status',
    render: (key: string) => <Status orderAddress={key} />,
  },
  {
    title: <Title title="BID" />,
    dataIndex: 'aToken',
    key: 'aToken',
    render: (aToken: PublicKey) => <Token mintAddress={aToken.toBase58()} />,
  },
  {
    title: <Title title="ASK" />,
    dataIndex: 'bToken',
    key: 'bToken',
    render: (bToken: PublicKey) => <Token mintAddress={bToken.toBase58()} />,
  },
  {
    title: <Title title="OFFERED PRICE" />,
    dataIndex: 'key',
    key: 'price',
    render: (key: string) => <OfferedPrice orderAddress={key} />,
  },
]

export default OfferColumns
