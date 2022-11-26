import { useMemo } from 'react'

import { Typography } from 'antd'

import { decimalize, numeric } from 'helpers/util'
import { useMetadataByAddress } from 'hooks/useToken'
import { useBalance } from 'hooks/useWallet'

export type TokenBalanceProps = {
  mintAddress: string
}

const TokenBalance = ({ mintAddress }: TokenBalanceProps) => {
  const { symbol, decimals } = useMetadataByAddress(mintAddress) || {}
  const [amount] = useBalance(mintAddress)

  const balance = useMemo(() => {
    if (typeof decimals !== 'number') return 0
    return decimalize(amount, decimals)
  }, [decimals, amount])

  return (
    <Typography.Text type="secondary">
      Balance: {numeric(balance).format('0,0.[000]')} {symbol}
    </Typography.Text>
  )
}

export default TokenBalance
