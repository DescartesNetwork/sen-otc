import { utils } from '@senswap/sen-js'

import { Space, Typography } from 'antd'
import { MintSymbol } from 'shared/antd/mint'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const OrderPriceCell = ({
  amount,
  mintAddress,
}: {
  amount: bigint
  mintAddress: string
}) => {
  const decimals = useMintDecimals(mintAddress)
  const amountValue = decimals ? utils.undecimalize(amount, decimals) : 0

  return (
    <Space>
      <Typography.Text>{amountValue}</Typography.Text>
      <Typography.Text type="secondary">
        <MintSymbol mintAddress={mintAddress} />
      </Typography.Text>
    </Space>
  )
}
export default OrderPriceCell
