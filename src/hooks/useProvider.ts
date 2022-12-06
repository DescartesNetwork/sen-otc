import { useMemo } from 'react'
import Otc, { AnchorWallet } from '@sentre/otc'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { AnchorProvider, Program, Spl, SplToken } from '@project-serum/anchor'

import configs from 'configs'
import { useLogIn } from './useAuth'

const {
  sol: { endpoint },
} = configs

/**
 * Connection
 * @returns
 */
export const useConnection = () => {
  const connection = new Connection(endpoint, 'confirmed')
  return connection
}

/**
 * Safely generate an anchor wallet instance
 * @returns
 */
export const useAnchorWallet = () => {
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

  return wallet
}

/**
 * Generate an OTC instance
 * @returns
 */
export const useOtc = () => {
  const wallet = useAnchorWallet()
  const otc = useMemo(() => new Otc(wallet, endpoint), [wallet])
  return otc
}

/**
 * Generate a SPL instance
 * @returns
 */
export const useSpl = (): Program<SplToken> => {
  const wallet = useAnchorWallet()
  const connection = useConnection()

  const spl = useMemo(() => {
    const provider = new AnchorProvider(connection, wallet, {
      skipPreflight: true,
      commitment: 'confirmed',
    })
    return Spl.token(provider)
  }, [wallet, connection])

  return spl
}
