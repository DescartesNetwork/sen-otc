import { Divider, Select, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintName } from 'shared/antd/mint'

const TokenSelect = ({
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
      className="otc-selection"
      value={value}
      onChange={onChange}
      bordered={false}
      suffixIcon={<Divider type="vertical" />}
      dropdownStyle={{ minWidth: 140 }}
    >
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
            <MintName mintAddress={tokenAddress} />
          </Space>
        </Select.Option>
      ))}
    </Select>
  )
}

export default TokenSelect
