import {
  ParsedTransactionMeta,
  PublicKey,
  ParsedInnerInstruction,
  ParsedInstruction,
} from '@solana/web3.js'
import BN from 'bn.js'
import { Fragment, useCallback, useEffect, useState } from 'react'
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
  onChange: (value: number) => void
}

const Volume = ({ mint, amount, onChange }: VolumeProps) => {
  const { decimals, cgkTicket } = useMetadataByAddress(mint.toBase58()) || {
    decimals: 0,
    cgkTicket: '',
  }
  const { price } = usePrice(cgkTicket)
  useEffect(() => {
    onChange(price * undecimalize(amount, decimals))
  }, [price, amount, decimals, onChange])
  return null
}

const TvlStatWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [refs, setRefs] = useState<Array<number | undefined>>([])
  const orders = useOrders()

  useEffect(() => {
    const tvl = refs
      .filter((ref): ref is number => !!ref)
      .reduce((a, b) => a + b, 0)
    dispatch(updateTvl(tvl))
  }, [dispatch, refs])

  return (
    <Fragment>
      {Object.values(orders).map(({ aToken, a }, i) => (
        <Volume
          key={i}
          mint={aToken}
          amount={a}
          onChange={(value) =>
            setRefs((prev) => {
              if (prev[i] === value) return prev
              prev[i] = value
              return [...prev]
            })
          }
        />
      ))}
    </Fragment>
  )
}

const VolumeStatWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [refs, setRefs] = useState<Array<number | undefined>>([])
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

  useEffect(() => {
    const volume24h = refs
      .filter((ref): ref is number => !!ref)
      .reduce((a, b) => a + b, 0)
    dispatch(updateVolume24h(volume24h))
  }, [dispatch, refs])

  return (
    <Fragment>
      {volume.map(({ mint, amount }, i) => (
        <Volume
          key={i}
          mint={mint}
          amount={amount}
          onChange={(value) =>
            setRefs((prev) => {
              if (prev[i] === value) return prev
              prev[i] = value
              return [...prev]
            })
          }
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
