import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'

import configs from 'configs'
import { AppState } from 'store'

const {
  sol: { connection },
} = configs

export const useLamports = () => {
  const { publicKey, sendTransaction } = useWallet()

  const lamports = useSelector(({ wallet }: AppState) => wallet.lamports)
  const transfer = useCallback(
    async (amount: number, to: PublicKey) => {
      if (!publicKey) return
      const ix = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: to,
        lamports: amount,
      })
      const tx = new Transaction().add(ix)
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext()
      const signature = await sendTransaction(tx, connection, {
        minContextSlot,
      })
      return connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      })
    },
    [publicKey, sendTransaction],
  )
  return [lamports, transfer] as [typeof lamports, typeof transfer]
}
