import { useMemo } from 'react'

import { Typography } from 'antd'

import { undecimalize, numeric } from 'helpers/util'
import { useMetadataByAddress } from 'hooks/useToken'
import { useOrderSelector } from 'hooks/useOrder'

export type TreasuryBalanceProps = {
  type: 'a' | 'b'
  orderAddress: string
  onMax?: (max: number) => void
}

const TreasuryBalance = ({
  type,
  orderAddress,
  onMax = () => {},
}: TreasuryBalanceProps) => {
  const { [type]: amount, [`${type}Token` as 'aToken' | 'bToken']: publicKey } =
    useOrderSelector((orders) => orders[orderAddress]) || {}
  const address = useMemo(() => publicKey?.toBase58() || '', [publicKey])
  const { symbol, decimals } = useMetadataByAddress(address) || {}

  const balance = useMemo(() => {
    if (typeof decimals !== 'number' || !amount) return 0
    return undecimalize(amount, decimals)
  }, [decimals, amount])

  return (
    <Typography.Text type="secondary" onClick={() => onMax(balance)}>
      Treasury Balance: {numeric(balance).format('0,0.[000]')} {symbol}
    </Typography.Text>
  )
}

export default TreasuryBalance
