import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  ConfirmedSignatureInfo,
  ParsedTransactionWithMeta,
  PublicKey,
} from '@solana/web3.js'
import { DEFAULT_OTC_PROGRAM_ID } from '@sentre/otc'

import { message } from 'antd'

import { AppDispatch } from 'store'
import { useConnection } from 'hooks/useProvider'
import { updateTransaction } from 'store/transaction.reducer'

const TransactionWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const connection = useConnection()
  const { pathname } = useLocation()

  const fetchData = useCallback(async () => {
    const oneDayAgo = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60
    let before: string | undefined
    let limit = 200
    while (true) {
      const txs: ConfirmedSignatureInfo[] = (
        await connection.getConfirmedSignaturesForAddress2(
          new PublicKey(DEFAULT_OTC_PROGRAM_ID),
          { before, limit },
        )
      ).filter((tx) => (tx.blockTime || 0) >= oneDayAgo)
      // Async updates
      try {
        const txIds = txs.map(({ signature }) => signature)
        const data = await connection.getParsedTransactions(txIds)
        let payload: Record<string, ParsedTransactionWithMeta> = {}
        txIds.forEach((txId, i) => {
          if (data[i]) payload[txId] = data[i] as ParsedTransactionWithMeta
        })
        dispatch(updateTransaction(payload))
      } catch (er: any) {
        message.error(er.message)
      }
      // Next circle
      if (txs.length < limit) break
      else before = txs[txs.length - 1].signature
    }
  }, [dispatch, connection])

  useEffect(() => {
    if (pathname.startsWith('/home')) fetchData()
  }, [pathname, fetchData])

  return null
}

export default TransactionWatcher
