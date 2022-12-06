import {
  createContext,
  forwardRef,
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'

import { useOrders } from 'hooks/useOrder'
import { useMetadataByAddress, usePrice } from 'hooks/useToken'
import { undecimalize } from 'helpers/util'

/**
 * Utility
 */
const TvlEachOrder = forwardRef<
  HTMLInputElement,
  {
    mint: PublicKey
    amount: BN
  }
>(({ mint, amount }, ref) => {
  const [tvl, setTvl] = useState(0)
  const { decimals, cgkTicket } = useMetadataByAddress(mint.toBase58()) || {
    decimals: 0,
    cgkTicket: '',
  }
  const { price } = usePrice(cgkTicket)
  useEffect(() => {
    const tvl = price * undecimalize(amount, decimals)
    setTvl(tvl)
  }, [price, amount, decimals])
  return (
    <input style={{ visibility: 'hidden' }} value={tvl} ref={ref} readOnly />
  )
})

/**
 * Context
 */
export type TvlContext = {
  tvl: number
}

const Context = createContext<TvlContext>({ tvl: 0 })

/**
 * Provider
 */

const TvlProvider = ({ children }: { children: ReactNode }) => {
  const orders = useOrders()
  const refs = useRef<Array<HTMLInputElement | null>>([])

  return (
    <Fragment>
      {Object.values(orders).map(({ aToken, a }, i) => (
        <TvlEachOrder
          key={i}
          mint={aToken}
          amount={a}
          ref={(el) => (refs.current[i] = el)}
        />
      ))}
      <Context.Provider
        value={{
          tvl: refs.current
            .map((ref) => Number(ref?.value) || 0)
            .reduce((a, b) => a + b, 0),
        }}
      >
        {children}
      </Context.Provider>
    </Fragment>
  )
}

export default TvlProvider

/**
 * Hook
 */
export const useTvl = () => {
  return useContext<TvlContext>(Context)
}
