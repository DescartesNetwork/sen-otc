import { useMemo } from 'react'

import { Typography } from 'antd'

import { undecimalize, numeric } from 'helpers/util'
import { useMetadataByAddress } from 'hooks/useToken'
import { useOrderSelector } from 'hooks/useOrder'
import { OrderState } from 'store/order.reducer'

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
  const {
    remainingAmount,
    [`${type}Token` as 'aToken' | 'bToken']: publicKey,
  } = useOrderSelector((orders: OrderState) => orders[orderAddress]) || {}
  const address = useMemo(() => publicKey?.toBase58() || '', [publicKey])
  const { symbol, decimals } = useMetadataByAddress(address) || {}

  const balance = useMemo(() => {
    if (typeof decimals !== 'number' || !remainingAmount) return 0
    return undecimalize(remainingAmount, decimals)
  }, [decimals, remainingAmount])

  return (
    <Typography.Text type="secondary" onClick={() => onMax(balance)}>
      Treasury Balance: {numeric(balance).format('0,0.[000]')} {symbol}
    </Typography.Text>
  )
}

export default TreasuryBalance
