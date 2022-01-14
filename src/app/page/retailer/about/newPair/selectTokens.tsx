import { Select, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const SelectTokens = ({
  tokens,
  onChange,
  value,
}: {
  tokens: string[]
  onChange: (tokenAddress: string) => void
  value: string
}) => {
  return (
    <Select
      className="pair-selection"
      value={value}
      onChange={onChange}
      bordered={false}
    >
      <Select.Option key="Select">
        <Space>
          <MintAvatar
            mintAddress="Select"
            icon={<IonIcon name="help-outline" />}
          />
          <Typography.Text type="secondary">Select token</Typography.Text>
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

export default SelectTokens
