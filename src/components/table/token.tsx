import { Avatar, Space, Typography } from 'antd'
import { useMetadataByAddress } from 'hooks/useToken'

export type TokenProps = {
  mintAddress: string
}

export const Token = ({ mintAddress }: TokenProps) => {
  const { symbol, url } = useMetadataByAddress(mintAddress) || {}
  return (
    <Space>
      <Avatar size={24} src={url} />
      <Typography.Text>{symbol}</Typography.Text>
    </Space>
  )
}
