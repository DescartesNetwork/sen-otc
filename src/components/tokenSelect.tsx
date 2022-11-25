import { CSSProperties, useMemo } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Avatar, Card, Select, Space } from 'antd'

import { AcceptedPayment } from 'helpers/acceptedPayments'

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
  options: AcceptedPayment
  value?: string
  onChange?: (value: string) => void
  style?: CSSProperties
}

const TokenSelection = ({
  options,
  value = 'SOL',
  onChange = () => {},
  style = {},
}: TokenSelectionProps) => {
  const token = useMemo(
    () => options.find((token) => token.symbol === value),
    [value, options],
  )

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
          showSearch
        />
      </Space>
    </Card>
  )
}

export default TokenSelection
