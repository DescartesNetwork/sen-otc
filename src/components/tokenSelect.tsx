import { CSSProperties } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Avatar, Card, Select, Space } from 'antd'

import { useMetadataBySymbol } from 'hooks/useToken'
import configs from 'configs'

const {
  otc: { acceptedPayments },
} = configs

export type TokenSelectionLiteProps = {
  options: string[]
  value?: string
  onChange?: (value: string) => void
  style?: CSSProperties
  prefix?: string
}

export const TokenSelectionLite = ({
  options,
  value,
  onChange = () => {},
  style = {},
  prefix = '',
}: TokenSelectionLiteProps) => {
  value = value || options[0] || ''
  return (
    <Select
      size="large"
      style={{ width: 96, ...style }}
      options={options.map((option) => ({
        value: option,
        label: option === value && prefix ? `${prefix} ${option}` : option,
      }))}
      value={value}
      onChange={onChange}
      suffixIcon={<IconSax name="ArrowDown2" />}
      showSearch
    />
  )
}

export type TokenSelectionProps = {
  options: TokenMetadata[]
  value?: string
  onChange?: (value: string) => void
  style?: CSSProperties
  disabled?: boolean
}

const TokenSelection = ({
  options,
  value = acceptedPayments[0].symbol,
  onChange = () => {},
  style = {},
  disabled = false,
}: TokenSelectionProps) => {
  const token = useMetadataBySymbol(value)

  return (
    <Card bodyStyle={{ padding: 3, ...style }}>
      <Space size={0}>
        <Avatar src={token?.url} size={30} />
        <Select
          style={{ width: 88 }}
          options={options.map(({ symbol }) => ({
            value: symbol,
            label: symbol,
          }))}
          value={value}
          onChange={onChange}
          suffixIcon={<IconSax name="ArrowDown2" />}
          bordered={false}
          disabled={disabled}
          showSearch
        />
      </Space>
    </Card>
  )
}

export default TokenSelection
