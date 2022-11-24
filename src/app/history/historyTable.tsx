import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export type HistoryType = {
  key: string
  name: string
  age: number
  address: string
}

const columns: ColumnsType<HistoryType> = [
  {
    title: (
      <Typography.Text type="secondary" style={{ fontWeight: 300 }}>
        NAME
      </Typography.Text>
    ),
    dataIndex: 'name',
    key: 'name',
    render: (name) => <Typography.Text>{name}</Typography.Text>,
  },
  {
    title: (
      <Typography.Text type="secondary" style={{ fontWeight: 300 }}>
        AGE
      </Typography.Text>
    ),
    dataIndex: 'age',
    key: 'age',
    render: (age) => <Typography.Text>{age}</Typography.Text>,
  },
  {
    title: (
      <Typography.Text type="secondary" style={{ fontWeight: 300 }}>
        ADDRESS
      </Typography.Text>
    ),
    dataIndex: 'address',
    key: 'address',
    render: (address) => <Typography.Text>{address}</Typography.Text>,
  },
]

const data: HistoryType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]

const HistoryTable = () => {
  return <Table columns={columns} dataSource={data} />
}

export default HistoryTable
