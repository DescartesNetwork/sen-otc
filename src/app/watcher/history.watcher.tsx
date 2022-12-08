import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  Connection,
  ParsedTransactionWithMeta,
  PublicKey,
} from '@solana/web3.js'
import { DEFAULT_OTC_PROGRAM_ID } from '@sentre/otc'
import { useWallet } from '@solana/wallet-adapter-react'

import { AppDispatch } from 'store'
import { useConnection } from 'hooks/useProvider'
import { updateHistory } from 'store/history.reducer'

const getAllConfirmedSignaturesForAddress = async (
  address: PublicKey,
  connection: Connection,
) => {
  let before: string | undefined
  let limit = 1000
  let txIds: string[] = []
  while (true) {
    const data = (
      await connection.getConfirmedSignaturesForAddress2(address, {
        before,
        limit,
      })
    ).map(({ signature }) => signature)
    txIds = txIds.concat(data)
    if (data.length < limit) break
    else before = txIds[txIds.length - 1]
  }
  return txIds
}

const getAllParsedTransactions = async (
  txIds: string[],
  connection: Connection,
) => {
  const bulk = txIds.reduce<string[][]>((rows, txId, i) => {
    if (i % 2 === 0) rows.push([txId])
    else rows[rows.length - 1].push(txId)
    return rows
  }, [])
  let data: (ParsedTransactionWithMeta | null)[][] = []
  for (const sub of bulk) data.push(await connection.getParsedTransactions(sub))
  return data.flat().filter((el): el is ParsedTransactionWithMeta => !!el)
}

const HistoryWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const connection = useConnection()
  const { publicKey } = useWallet()
  const { pathname } = useLocation()

  const fetchData = useCallback(async () => {
    if (!publicKey) return []
    const allOtcTxIds = await getAllConfirmedSignaturesForAddress(
      new PublicKey(DEFAULT_OTC_PROGRAM_ID),
      connection,
    )
    const allMyTxIds = await getAllConfirmedSignaturesForAddress(
      publicKey,
      connection,
    )
    const txIds = allMyTxIds.filter((txId) => allOtcTxIds.includes(txId))
    const parsedTxs = await getAllParsedTransactions(txIds, connection)
    const payload: Record<string, ParsedTransactionWithMeta> = {}
    parsedTxs.forEach(
      (parsedTx) => (payload[parsedTx.transaction.signatures[0]] = parsedTx),
    )
    return dispatch(updateHistory(payload))
  }, [dispatch, connection, publicKey])

  useEffect(() => {
    if (pathname.startsWith('/history')) fetchData()
  }, [pathname, fetchData])

  return null
}

export default HistoryWatcher
