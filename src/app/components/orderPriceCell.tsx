import { utils } from '@senswap/sen-js'

import { Space, Typography } from 'antd'
import { MintSymbol } from 'shared/antd/mint'

const OrderPriceCell = ({
  amount,
  mintAddress,
}: {
  amount: bigint
  mintAddress: string
}) => {
  return (
    <Space>
      <Typography.Text>{utils.undecimalize(amount, 0)}</Typography.Text>
      <Typography.Text type="secondary">
        <MintSymbol mintAddress={mintAddress} />
      </Typography.Text>
    </Space>
  )
}
export default OrderPriceCell
