import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'

import { AppDispatch } from 'store'
import configs from 'configs'
import { updateWallet } from 'store/wallet.reducer'

const {
  sol: { connection },
} = configs

const WalletWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { publicKey } = useWallet()

  const fetchData = useCallback(async () => {
    if (!publicKey) return dispatch(updateWallet({ address: '', lamports: 0 }))
    const lamports = await connection.getBalance(publicKey)
    return dispatch(updateWallet({ address: publicKey.toBase58(), lamports }))
  }, [dispatch, publicKey])

  const watchData = useCallback(() => {
    if (!publicKey) return () => {}
    const watchId = connection.onAccountChange(publicKey, ({ lamports }) => {
      return dispatch(updateWallet({ lamports }))
    })
    return () => connection.removeAccountChangeListener(watchId)
  }, [dispatch, publicKey])

  useEffect(() => {
    fetchData()
    const unwatch = watchData()
    return unwatch
  }, [fetchData, watchData])

  return null
}

export default WalletWatcher
