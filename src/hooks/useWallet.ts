import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { utils } from '@project-serum/anchor'
import useSWR from 'swr'
import BN from 'bn.js'

import configs from 'configs'
import { AppState } from 'store'
import { useSpl } from './useProvider'
import { isAddress } from '@sentre/otc'

const {
  sol: { connection },
  otc: { acceptedPayments, partneredTokens },
} = configs
const TOKENS = [...acceptedPayments, ...partneredTokens].map(
  ({ address }) => new PublicKey(address),
)

/**
 * Get sol balance
 * @returns
 */
export const useLamports = () => {
  const { publicKey: fromPubkey, sendTransaction } = useWallet()
  const lamports = useSelector(({ wallet }: AppState) => wallet.lamports)

  const transfer = useCallback(
    async (amount: number, to: string) => {
      if (!fromPubkey) throw new Error('Invalid wallet address')
      if (!isAddress(to)) throw new Error('Invalid destination address')
      const ix = SystemProgram.transfer({
        fromPubkey,
        toPubkey: new PublicKey(to),
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
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      })
      return signature
    },
    [fromPubkey, sendTransaction],
  )

  return { lamports, transfer }
}

/**
 * Get token balance
 * @param mintAddress
 */
export const useBalance = (mintAddress: string) => {
  const spl = useSpl()
  const { publicKey: owner } = useWallet()
  const { data, mutate } = useSWR(mintAddress, async (mintAddress) => {
    if (!owner) throw new Error('Invalid wallet address')
    if (!isAddress(mintAddress)) throw new Error('Invalid mint address')
    const source = await utils.token.associatedAddress({
      mint: new PublicKey(mintAddress),
      owner,
    })
    const data = await spl.account.token.fetch(source)
    return data
  })

  const amount = data?.amount || new BN(0)
  const transfer = useCallback(
    async (amount: BN, to: string) => {
      if (!owner) throw new Error('Invalid wallet address')
      if (!isAddress(mintAddress)) throw new Error('Invalid mint address')
      if (!isAddress(to)) throw new Error('Invalid destination address')
      const source = await utils.token.associatedAddress({
        mint: new PublicKey(mintAddress),
        owner,
      })
      const txId = await spl.methods
        .transfer(amount)
        .accounts({
          source,
          destination: new PublicKey(to),
          authority: owner,
        })
        .rpc()
      await mutate()
      return txId
    },
    [owner, spl, mintAddress, mutate],
  )

  return { amount, transfer }
}

/**
 * Derive a mapping from token accounts to mints
 * @returns
 */
export const useTokenAccountMappingMint = () => {
  const { publicKey: owner } = useWallet()
  const [mapping, setMapping] = useState<Record<string, string>>({})

  const derive = useCallback(async () => {
    if (!owner) return setMapping({})
    const tokenAccounts = await Promise.all(
      TOKENS.map((mint) => utils.token.associatedAddress({ mint, owner })),
    )
    let mapping: Record<string, string> = {}
    tokenAccounts.map(
      (tokenAccount, i) =>
        (mapping[tokenAccount.toBase58()] = TOKENS[i].toBase58()),
    )
    return setMapping(mapping)
  }, [owner])

  useEffect(() => {
    derive()
  }, [derive])

  return mapping
}
