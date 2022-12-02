import { OrderData } from '@sentre/otc'
import type { ColumnsType } from 'antd/es/table'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'

import { Space, Table } from 'antd'
import { Address } from 'components/table/address'
import { Title } from 'components/table/title'
import { Token } from 'components/table/token'
import { Datetime } from 'components/table/datetime'
import { OfferedPrice } from 'components/table/price'
import { Status } from 'components/table/status'

import { useOrders } from 'hooks/useOrder'

const columns: ColumnsType<OrderData & { key: string }> = [
  {
    title: <Title title="ADDRESS" />,
    dataIndex: 'key',
    key: 'key',
    render: (key: string) => <Address address={key} />,
  },
  {
    title: <Title title="DATE" />,
    dataIndex: 'startDate',
    key: 'startDate',
    render: (startDate: BN, { endDate }) => (
      <Space direction="vertical" align="center">
        <Datetime timestamp={startDate.toNumber() * 1000} />
        <Datetime timestamp={endDate.toNumber() * 1000} />
      </Space>
    ),
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

const MyOrdersTable = () => {
  const orders = useOrders()

  return (
    <Table
      columns={columns}
      dataSource={Object.keys(orders).map((address) => ({
        key: address,
        ...orders[address],
      }))}
    />
  )
}

export default MyOrdersTable
