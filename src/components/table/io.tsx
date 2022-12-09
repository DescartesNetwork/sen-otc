import BN from 'bn.js'

import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'components/mint'
import { useMetadataByAddress } from 'hooks/useToken'
import { numeric, undecimalize } from 'helpers/util'

export type IoElementProps = {
  mintAddress: string
  amount: BN
}

export const IoElement = ({ mintAddress, amount }: IoElementProps) => {
  const { decimals } = useMetadataByAddress(mintAddress) || { decimals: 0 }
  const num = undecimalize(amount, decimals)
  const color = num >= 0 ? 'success' : 'danger'

  return (
    <Space key={mintAddress}>
      <MintAvatar mintAddress={mintAddress} size={24} />
      <Typography.Text type={color}>
        {numeric(num).format('0,0.[0000]')}
      </Typography.Text>
      <Typography.Text type={color}>
        <MintSymbol mintAddress={mintAddress} />
      </Typography.Text>
    </Space>
  )
}

export type IoProps = {
  io: Record<string, BN>
}

export const Io = ({ io }: IoProps) => {
  return (
    <Space direction="vertical" size={2}>
      {Object.keys(io).map((mintAddress) => (
        <IoElement
          key={mintAddress}
          mintAddress={mintAddress}
          amount={io[mintAddress]}
        />
      ))}
    </Space>
  )
}
