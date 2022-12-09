import { useMemo } from 'react'
import { isAddress } from '@sentre/otc'

import { Table } from 'antd'
import HistoryColumn, { HistoryType } from './historyColumn'

import {
  useHistory,
  useHistoryIo,
  useHistoryOrderAddress,
} from 'hooks/useHistory'
import { Infix } from 'store/ui.reducer'
import { useSort } from 'providers/sort.provider'
import { useSymbol } from 'providers/symbol.provider'
import { useMetadataBySymbol } from 'hooks/useToken'

const HistoryTable = () => {
  const history = useHistory()
  const txIdToIo = useHistoryIo()
  const txIdToOrderAddress = useHistoryOrderAddress()
  const { sort } = useSort()
  const { partneredToken } = useSymbol()
  const { address } = useMetadataBySymbol(partneredToken) || {}

  const data = useMemo(() => {
    const raw = Object.keys(history)
      .map((txId) => ({
        key: txId,
        time: (history[txId].blockTime || 0) * 1000,
        io: txIdToIo[txId],
        orderAddress: txIdToOrderAddress[txId],
      }))
      .filter((el): el is HistoryType => !!el.io && !!el.orderAddress)
      .filter(({ io }) => {
        if (partneredToken === 'All') return true
        return isAddress(address) && Object.keys(io).includes(address)
      })
      .sort(({ time: prevTime }, { time: nextTime }) => {
        if (sort.startsWith('Ascending')) return prevTime < nextTime ? 1 : -1
        else if (sort.startsWith('Descending'))
          return prevTime < nextTime ? -1 : 1
        else return 0
      })
    return raw
  }, [history, txIdToIo, txIdToOrderAddress, sort, partneredToken, address])

  return (
    <Table columns={HistoryColumn} dataSource={data} scroll={{ x: Infix.md }} />
  )
}

export default HistoryTable
