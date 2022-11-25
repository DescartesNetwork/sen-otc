import { useMemo } from 'react'
import Otc, { AnchorWallet } from '@sentre/otc'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'

import configs from 'configs'
import { useLogIn } from './useAuth'
import { useSelector } from 'react-redux'
import { AppState } from 'store'
import { OrderState } from 'store/order.reducer'

const {
  sol: { endpoint },
} = configs

/**
 * Generate an OTC instance
 * @returns
 */
export const useOtc = () => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet()
  const login = useLogIn()

  const wallet: AnchorWallet = useMemo(() => {
    if (!publicKey || !signTransaction || !signAllTransactions)
      return {
        publicKey: new PublicKey(
          'GuestAccount11111111111111111111111111111111',
        ),
        signTransaction: async (tx: Transaction) => {
          login()
          return tx
        },
        signAllTransactions: async (txs: Transaction[]) => {
          login()
          return txs
        },
      }
    return { publicKey, signTransaction, signAllTransactions }
  }, [publicKey, login, signTransaction, signAllTransactions])

  const otc = useMemo(() => new Otc(wallet, endpoint), [wallet])

  return otc
}

/**
 * Get all orders/offers
 * @returns
 */
export const useOrders = () => {
  const orders = useSelector(({ order }: AppState) => order)
  return orders
}

/**
 * Get selective orders/offers
 * @returns
 */
export const useOrderSelector = (
  selector: (orders: OrderState) => OrderState,
) => {
  const orders = useSelector(({ order }: AppState) => selector(order))
  return orders
}
