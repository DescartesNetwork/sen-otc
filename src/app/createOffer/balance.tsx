import { useMemo } from 'react'
import { BN } from 'bn.js'

import { Typography } from 'antd'

import { numeric } from 'helpers/util'
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
    return amount.div(new BN(10 ** decimals)).toNumber()
  }, [decimals, amount])

  return (
    <Typography.Text type="secondary">
      Balance: {numeric(balance).format('0,0.[000]')} {symbol}
    </Typography.Text>
  )
}

export default TokenBalance
