import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const MintInfo = ({
  label = '',
  mintAddress,
  value = '',
  floatRight = false,
}: {
  label?: string
  mintAddress: string
  value?: string | number
  floatRight?: boolean
}) => {
  const textAlign = floatRight ? 'right' : 'left'
  return (
    <Space size={8} direction="vertical" style={{ textAlign }}>
      <Typography.Text>{label}</Typography.Text>
      <Space>
        <MintAvatar mintAddress={mintAddress} />
        <MintSymbol mintAddress={mintAddress} />
      </Space>
      <Typography.Title level={3}>{value}</Typography.Title>
    </Space>
  )
}

export default MintInfo
