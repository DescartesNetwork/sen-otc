import { useCallback, useEffect, useState } from 'react'
import { OrderData, OrderState, OrderStates } from '@sentre/otc'
import type { ColumnsType } from 'antd/es/table'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import isEqual from 'react-fast-compare'

import { Badge, Button, Col, message, Row, Space, Table } from 'antd'
import { Address } from 'components/table/address'
import { Title } from 'components/table/title'
import { Token } from 'components/table/token'
import { Datetime } from 'components/table/datetime'
import { OfferedPrice } from 'components/table/price'
import { Status } from 'components/table/status'

import { useOrderSelector } from 'hooks/useOrder'
import { useOtc } from 'hooks/useProvider'
import { Infix } from 'store/ui.reducer'
import { filterAction, useAction } from 'providers/action.provider'
import { filterStatus, useStatus } from 'providers/status.provider'
import {
  filterPartneredToken,
  filterPaymentMethod,
  useSymbol,
} from 'providers/symbol.provider'
import { sortRecent, useSort } from 'providers/sort.provider'

const columns: ColumnsType<OrderData & { key: string }> = [
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
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])
  const { action } = useAction()
  const { status } = useStatus()
  const { paymentMethod, partneredToken } = useSymbol()
  const { sort } = useSort()
  const orders = useOrderSelector((orders) => {
    orders = filterAction(action)(orders)
    orders = filterStatus(status)(orders)
    orders = filterPaymentMethod(action, paymentMethod)(orders)
    orders = filterPartneredToken(action, partneredToken)(orders)
    orders = sortRecent(sort)(orders)
    return orders
  })

  useEffect(() => {
    const [key] = Object.keys(orders)
    setExpandedRowKeys(key ? [key] : [])
  }, [orders])

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
        expandedRowKeys,
        onExpand: (expanded, { key }) =>
          setExpandedRowKeys(!expanded ? [] : [key]),
      }}
      scroll={{ x: Infix.md }}
    />
  )
}

export default MyOrdersTable
