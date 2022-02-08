import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const MintInfo = ({
  mintAddress,
  value = '',
  floatRight = false,
}: {
  mintAddress: string
  value?: string | number
  floatRight?: boolean
}) => {
  const textAlign = floatRight ? 'right' : 'left'
  return (
    <Space size={8} direction="vertical" style={{ textAlign }}>
      <Space>
        <MintAvatar mintAddress={mintAddress} />
        <MintSymbol mintAddress={mintAddress} />
      </Space>
      <Typography.Title level={3}>{value}</Typography.Title>
    </Space>
  )
}

export default MintInfo
