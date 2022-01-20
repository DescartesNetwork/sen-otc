import { utils } from '@senswap/sen-js'

import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { numeric } from 'shared/util'

const OrderPriceCell = ({
  amount,
  mintAddress,
  size,
}: {
  amount: bigint
  mintAddress: string
  size?: number
}) => {
  const decimals = useMintDecimals(mintAddress) || 0
  return (
    <Space>
      <MintAvatar mintAddress={mintAddress} size={size} />
      <Typography.Text>
        {numeric(utils.undecimalize(amount, decimals)).format('0,0.[0000]')}
      </Typography.Text>
      <Typography.Text type="secondary">
        <MintSymbol mintAddress={mintAddress} />
      </Typography.Text>
    </Space>
  )
}
export default OrderPriceCell
