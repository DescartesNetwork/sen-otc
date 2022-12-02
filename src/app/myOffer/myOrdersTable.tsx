import { OrderData, OrderState, OrderStates } from '@sentre/otc'
import type { ColumnsType } from 'antd/es/table'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import isEqual from 'react-fast-compare'

import { Button, Col, message, Row, Table } from 'antd'
import { Address } from 'components/table/address'
import { Title } from 'components/table/title'
import { Token } from 'components/table/token'
import { Datetime } from 'components/table/datetime'
import { OfferedPrice } from 'components/table/price'
import { Status } from 'components/table/status'

import { useOrders } from 'hooks/useOrder'
import { useCallback, useState } from 'react'
import { useOtc } from 'hooks/useProvider'

const columns: ColumnsType<OrderData & { key: string }> = [
  {
    title: <Title title="ADDRESS" />,
    dataIndex: 'key',
    key: 'key',
    render: (key: string) => <Address address={key} />,
  },
  {
    title: <Title title="STARTED AT" />,
    dataIndex: 'startDate',
    key: 'startDate',
    render: (startDate: BN) => (
      <Datetime timestamp={startDate.toNumber() * 1000} />
    ),
  },
  {
    title: <Title title="ENDED AT" />,
    dataIndex: 'endDate',
    key: 'endDate',
    render: (endDate: BN) => <Datetime timestamp={endDate.toNumber() * 1000} />,
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

const Action = ({
  orderAddress,
  state,
}: {
  orderAddress: string
  state: OrderState
}) => {
  const [loading, setLoading] = useState(0)
  const otc = useOtc()

  const onPause = useCallback(async () => {
    try {
      setLoading(1)
      await otc.pause({ orderAddress })
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(0)
    }
  }, [orderAddress, otc])

  const onResume = useCallback(async () => {
    try {
      setLoading(1)
      await otc.resume({ orderAddress })
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(0)
    }
  }, [orderAddress, otc])

  const onComplete = useCallback(async () => {
    try {
      setLoading(2)
      await otc.stop({ orderAddress })
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(0)
    }
  }, [orderAddress, otc])

  return (
    <Row gutter={[12, 12]} justify="end">
      <Col>
        <Button
          type="text"
          shape="round"
          loading={loading === 1}
          onClick={isEqual(state, OrderStates.Paused) ? onResume : onPause}
        >
          {isEqual(state, OrderStates.Paused) ? 'Resume' : 'Pause'}
        </Button>
      </Col>
      <Col>
        <Button
          type="primary"
          shape="round"
          loading={loading === 2}
          onClick={onComplete}
        >
          Complete
        </Button>
      </Col>
    </Row>
  )
}

const MyOrdersTable = () => {
  const orders = useOrders()

  return (
    <Table
      columns={columns}
      dataSource={Object.keys(orders).map((address) => ({
        key: address,
        ...orders[address],
      }))}
      expandable={{
        expandedRowRender: ({ key, state }) => (
          <Action orderAddress={key} state={state} />
        ),
        expandRowByClick: true,
        showExpandColumn: false,
        defaultExpandedRowKeys: ['0'],
      }}
    />
  )
}

export default MyOrdersTable
