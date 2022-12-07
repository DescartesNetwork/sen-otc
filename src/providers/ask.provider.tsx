import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export type AskContext = {
  askToken: string
  setAskToken: (askToken: string) => void
  askAmount: string
  setAskAmount: (askAmount: string) => void
  askAmountError: string
  resetAskAmount: () => void
  askPrice: string
  setAskPrice: (askPrice: string) => void
  askPriceError: string
  resetAskPrice: () => void
}

/**
 * Context
 */
const Context = createContext<AskContext>({
  askToken: '',
  setAskToken: () => {},
  askAmount: '',
  setAskAmount: () => {},
  askAmountError: '',
  resetAskAmount: () => {},
  askPrice: '',
  setAskPrice: () => {},
  askPriceError: '',
  resetAskPrice: () => {},
})

/**
 * Provider
 */
export const AskProvider = ({ children }: { children: ReactNode }) => {
  const [askToken, setAskToken] = useState('')
  const [askAmount, setAskAmount] = useState('')
  const [askAmountError, setAskAmountError] = useState('')
  const [askPrice, setAskPrice] = useState('')
  const [askPriceError, setAskPriceError] = useState('')

  const wrappedSetAskAmount = useCallback((askAmount: string) => {
    const askAmountError = validateAskAmount(askAmount)
    setAskAmountError(askAmountError)
    setAskAmount(askAmount)
  }, [])

  const wrappedSetAskPrice = useCallback((askPrice: string) => {
    const askPriceError = validateAskPrice(askPrice)
    setAskPriceError(askPriceError)
    setAskPrice(askPrice)
  }, [])

  const resetAskAmount = useCallback(() => {
    setAskAmountError('')
    setAskAmount('')
  }, [])

  const resetAskPrice = useCallback(() => {
    setAskPriceError('')
    setAskPrice('')
  }, [])

  const value = useMemo(
    () => ({
      askToken,
      setAskToken,
      askAmount,
      setAskAmount: wrappedSetAskAmount,
      askAmountError,
      resetAskAmount,
      askPrice,
      setAskPrice: wrappedSetAskPrice,
      askPriceError,
      resetAskPrice,
    }),
    [
      askToken,
      askAmount,
      wrappedSetAskAmount,
      askAmountError,
      resetAskAmount,
      askPrice,
      wrappedSetAskPrice,
      askPriceError,
      resetAskPrice,
    ],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Hook
 */
export const useAsk = () => {
  return useContext<AskContext>(Context)
}

/**
 * Utility
 */
export const validateAskAmount = (askAmount: string) => {
  if (isNaN(Number(askAmount)) || isNaN(parseFloat(askAmount)))
    return 'Invalid ask amount.'
  return ''
}
export const validateAskPrice = (askPrice: string) => {
  if (isNaN(Number(askPrice)) || isNaN(parseFloat(askPrice)))
    return 'Invalid ask price.'
  return ''
}
