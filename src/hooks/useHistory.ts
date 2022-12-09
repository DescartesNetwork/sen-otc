import { useWallet } from '@solana/wallet-adapter-react'
import { ParsedInstruction } from '@solana/web3.js'
import BN from 'bn.js'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'store'
import { HistoryState } from 'store/history.reducer'
import { useTokenAccountMappingMint } from './useWallet'

/**
 * Get all history
 * @returns
 */
export const useHistory = () => {
  const history = useSelector(({ history }: AppState) => history)
  return history
}

/**
 * Get selective history
 * @param selector
 * @returns
 */
export const useHistorySelector = <T>(
  selector: (orders: HistoryState) => T,
): T => {
  const history = useSelector(({ history }: AppState) => selector(history))
  return history
}

/**
 * Parse a mapping txId -> io
 * @returns
 */
export const useHistoryIo = () => {
  const history = useHistory()
  const mapping = useTokenAccountMappingMint()
  const { publicKey } = useWallet()

  const data = useMemo(() => {
    const data: Record<string, Record<string, BN>> = {}
    Object.keys(history).forEach((txId) => {
      if (!publicKey) return
      const { meta } = history[txId]
      // Aggregate data
      let io: Record<string, BN> = {}
      const { innerInstructions } = meta || {}
      if (!innerInstructions) return
      const { instructions } = innerInstructions[0] || {}
      if (!instructions) return
      instructions
        .filter(
          (ix): ix is ParsedInstruction => 'program' in ix && 'parsed' in ix,
        )
        .filter(
          ({ program, parsed: { type } }) =>
            program === 'spl-token' && type === 'transfer',
        )
        .map(({ parsed: { info } }) => info)
        .map<{
          amount: BN
          mint: string
        }>(({ amount, authority, source, destination }) => ({
          amount: new BN(amount).mul(
            authority === publicKey?.toBase58() ? new BN(-1) : new BN(1),
          ),
          mint: mapping[source] || mapping[destination] || '',
        }))
        .filter(({ mint }) => !!mint)
        .forEach(({ mint, amount }) => {
          if (!io[mint]) io[mint] = new BN(0)
          io[mint] = io[mint].add(amount)
        })
      data[txId] = io
    })
    return data
  }, [history, mapping, publicKey])

  return data
}

/**
 * Parse a mapping txId -> orderAddress
 * @returns
 */
export const useHistoryOrderAddress = () => {
  const history = useHistory()

  const data = useMemo(() => {
    const data: Record<string, string> = {}
    Object.keys(history).forEach((txId) => {
      const {
        transaction: {
          message: { instructions },
        },
      } = history[txId]
      if (instructions[0] && 'accounts' in instructions[0])
        data[txId] = instructions[0].accounts[2].toBase58()
    })
    return data
  }, [history])

  return data
}
