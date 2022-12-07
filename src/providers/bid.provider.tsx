import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import BN from 'bn.js'
import { decimalize } from 'helpers/util'
import { useMetadataBySymbol } from 'hooks/useToken'
import { useBalance } from 'hooks/useWallet'

export type BidContext = {
  bidToken: string
  setBidToken: (bidToken: string) => void
  bidAmount: string
  setBidAmount: (bidAmount: string) => void
  bidAmountError: string
  resetBidAmount: () => void
}

/**
 * Context
 */
const Context = createContext<BidContext>({
  bidToken: '',
  setBidToken: () => {},
  bidAmount: '',
  setBidAmount: () => {},
  bidAmountError: '',
  resetBidAmount: () => {},
})

/**
 * Provider
 */
export const BidProvider = ({ children }: { children: ReactNode }) => {
  const [bidToken, setBidToken] = useState('')
  const [bidAmount, setBidAmount] = useState('')
  const [bidAmountError, setBidAmountError] = useState('')
  const { decimals, address } = useMetadataBySymbol(bidToken) || {
    decimals: 0,
    address: '',
  }
  const { amount } = useBalance(address)

  const wrappedSetBidAmount = useCallback(
    (bidAmount: string) => {
      const bidAmountError = validateBidAmount(bidAmount, decimals, amount)
      setBidAmountError(bidAmountError)
      setBidAmount(bidAmount)
    },
    [decimals, amount],
  )

  const resetBidAmount = useCallback(() => {
    setBidAmountError('')
    setBidAmount('')
  }, [])

  const value = useMemo(
    () => ({
      bidToken,
      setBidToken,
      bidAmount,
      setBidAmount: wrappedSetBidAmount,
      bidAmountError,
      resetBidAmount,
    }),
    [bidToken, bidAmount, wrappedSetBidAmount, bidAmountError, resetBidAmount],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useBid = () => {
  return useContext<BidContext>(Context)
}

/**
 * Utility
 */
export const validateBidAmount = (
  bidAmount: string,
  decimals: number,
  balance: BN,
) => {
  if (isNaN(Number(bidAmount)) || isNaN(parseFloat(bidAmount)))
    return 'Invalid bid amount.'
  if (typeof decimals !== 'number' || !BN.isBN(balance))
    return 'Please select bid token first.'
  if (decimalize(Number(bidAmount), decimals).gt(balance))
    return 'Not enough balance'
  return ''
}
