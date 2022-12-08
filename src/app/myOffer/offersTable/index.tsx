import { useEffect, useState } from 'react'

import { Table } from 'antd'
import OfferColumns from './offerColumn'
import OfferAction from './offerAction'

import { useOrderSelector } from 'hooks/useOrder'
import { Infix } from 'store/ui.reducer'
import { filterAction, useAction } from 'providers/action.provider'
import { filterStatus, useStatus } from 'providers/status.provider'
import {
  filterPartneredToken,
  filterPaymentMethod,
  useSymbol,
} from 'providers/symbol.provider'
import { sortRecent, useSort } from 'providers/sort.provider'

const OffersTable = () => {
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
      columns={OfferColumns}
      dataSource={Object.keys(orders).map((address) => ({
        key: address,
        ...orders[address],
      }))}
      expandable={{
        expandedRowRender: ({ key, state }) => (
          <OfferAction orderAddress={key} state={state} />
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

export default OffersTable
