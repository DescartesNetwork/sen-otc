import { Select, SelectProps, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const TokenSelect = ({
  tokens,
  ...rest
}: {
  tokens: string[]
} & SelectProps) => {
  return (
    <Select {...rest}>
      <Select.Option key="Select">
        <Space>
          <MintAvatar
            mintAddress="Select"
            icon={<IonIcon name="help-outline" />}
          />
          <Typography.Text>Select</Typography.Text>
        </Space>
      </Select.Option>
      {tokens.map((tokenAddress) => (
        <Select.Option key={tokenAddress}>
          <Space>
            <MintAvatar mintAddress={tokenAddress} />
            <MintSymbol mintAddress={tokenAddress} />
          </Space>
        </Select.Option>
      ))}
    </Select>
  )
}

export default TokenSelect
