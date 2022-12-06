import { useSelector } from 'react-redux'

import { AppState } from 'store'

export const useTransactions = () => {
  const txs = useSelector(({ transaction }: AppState) => transaction)
  return txs
}

export const useNumberofTransaction = () => {
  const txs = useTransactions()
  return Object.keys(txs).length
}

export const useTvl = () => {
  const tvl = useSelector(({ stat }: AppState) => stat.tvl)
  return tvl
}

export const useVolume24h = () => {
  const volume24h = useSelector(({ stat }: AppState) => stat.volume24h)
  return volume24h
}
