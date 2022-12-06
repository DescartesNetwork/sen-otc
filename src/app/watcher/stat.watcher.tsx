import {
  ParsedTransactionMeta,
  PublicKey,
  ParsedInnerInstruction,
  ParsedInstruction,
} from '@solana/web3.js'
import BN from 'bn.js'
import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { utils } from '@project-serum/anchor'

import configs from 'configs'
import { useMetadataByAddress, usePrice } from 'hooks/useToken'
import { undecimalize } from 'helpers/util'
import { useOrders } from 'hooks/useOrder'
import { AppDispatch } from 'store'
import { updateTvl, updateVolume24h } from 'store/stat.reducer'
import { useTransactions } from 'hooks/useStat'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs
const TOKENS = [...acceptedPayments, ...partneredTokens].map(
  ({ address }) => new PublicKey(address),
)

type VolumeProps = {
  mint: PublicKey
  amount: BN
}

const Volume = forwardRef<HTMLInputElement, VolumeProps>(
  ({ mint, amount }, ref) => {
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
    return <input style={{ display: 'none' }} value={tvl} ref={ref} readOnly />
  },
)

const TvlStatWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const orders = useOrders()

  const tvl = useMemo(() => {
    if (Object.keys(orders).length) return 0
    return refs.current
      .map((ref) => Number(ref?.value) || 0)
      .reduce((a, b) => a + b, 0)
  }, [orders])

  useEffect(() => {
    dispatch(updateTvl(tvl))
  }, [dispatch, tvl])

  return (
    <Fragment>
      {Object.values(orders).map(({ aToken, a }, i) => (
        <Volume
          key={i}
          mint={aToken}
          amount={a}
          ref={(el) => (refs.current[i] = el)}
        />
      ))}
    </Fragment>
  )
}

const VolumeStatWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const txs = useTransactions()
  const [volume, setVolume] = useState<VolumeProps[]>([])

  const onVolume = useCallback(async () => {
    const transferTxs = Object.values(txs)
      .map(({ meta }) => meta)
      .filter((meta): meta is ParsedTransactionMeta => !!meta)
      .map(({ innerInstructions }) => innerInstructions)
      .filter(
        (innerInstruction): innerInstruction is ParsedInnerInstruction[] =>
          !!innerInstruction,
      )
      .flat()
      .map(({ instructions }) => instructions)
      .flat()
      .filter(
        (ix): ix is ParsedInstruction => 'program' in ix && 'parsed' in ix,
      )
      .filter(
        ({ program, parsed: { type } }) =>
          program === 'spl-token' && type === 'transfer',
      )
      .map(
        ({
          parsed: { info },
        }: {
          parsed: {
            info: SplTokenTransferTransaction
          }
        }) => info,
      )
    const volume = (
      await Promise.all(
        transferTxs.map(async ({ authority, source, amount }) => {
          const owner = new PublicKey(authority)
          for (const mint of TOKENS) {
            const address = await utils.token.associatedAddress({
              mint,
              owner,
            })
            if (address.toBase58() === source)
              return {
                mint,
                amount: new BN(amount),
              }
          }
        }),
      )
    ).filter((el): el is VolumeProps => !!el)
    return setVolume(volume)
  }, [txs])

  useEffect(() => {
    onVolume()
  }, [onVolume])

  const volume24h = useMemo(() => {
    if (!volume.length) return 0
    return refs.current
      .map((ref) => Number(ref?.value) || 0)
      .reduce((a, b) => a + b, 0)
  }, [volume])

  useEffect(() => {
    dispatch(updateVolume24h(volume24h))
  }, [dispatch, volume24h])

  return (
    <Fragment>
      {volume.map(({ mint, amount }, i) => (
        <Volume
          key={i}
          mint={mint}
          amount={amount}
          ref={(el) => (refs.current[i] = el)}
        />
      ))}
    </Fragment>
  )
}

const StatWatcher = () => {
  return (
    <Fragment>
      <TvlStatWatcher />
      <VolumeStatWatcher />
    </Fragment>
  )
}

export default StatWatcher
