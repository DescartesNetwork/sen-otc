import { useMemo } from 'react'

import { Typography } from 'antd'

import { undecimalize, numeric } from 'helpers/util'
import { useMetadataByAddress } from 'hooks/useToken'
import { useBalance } from 'hooks/useWallet'

export type TokenBalanceProps = {
  mintAddress: string
  onMax?: (max: number) => void
}

const TokenBalance = ({ mintAddress, onMax = () => {} }: TokenBalanceProps) => {
  const { symbol, decimals } = useMetadataByAddress(mintAddress) || {}
  const { amount } = useBalance(mintAddress)

  const balance = useMemo(() => {
    if (typeof decimals !== 'number') return 0
    return undecimalize(amount, decimals)
  }, [decimals, amount])

  return (
    <Typography.Text
      type="secondary"
      style={{ cursor: 'pointer' }}
      onClick={() => onMax(balance)}
    >
      Balance: {numeric(balance).format('0,0.[000]')} {symbol}
    </Typography.Text>
  )
}

export default TokenBalance
