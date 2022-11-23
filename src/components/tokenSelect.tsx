import { useMemo } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Avatar, Card, Select, Space } from 'antd'

import { ACCEPTED_PAYMENTS } from 'helpers/acceptedPayments'

export const parseToken = (symbol: string) => {
  return ACCEPTED_PAYMENTS.find((token) => token.symbol === symbol)
}

export type TokenSelectionProps = {
  symbol?: string
  onSymbol?: (symbol: string) => void
}

const TokenSelection = ({
  symbol = 'SOL',
  onSymbol = () => {},
}: TokenSelectionProps) => {
  const token = useMemo(() => parseToken(symbol), [symbol])

  return (
    <Card bodyStyle={{ padding: 3 }}>
      <Space size={0}>
        <Avatar src={token?.url} size={30} />
        <Select
          style={{ width: 80 }}
          options={ACCEPTED_PAYMENTS.map(({ symbol }) => ({
            value: symbol,
            label: symbol,
          }))}
          value={symbol}
          onChange={onSymbol}
          suffixIcon={<IconSax name="ArrowDown2" />}
          bordered={false}
          showSearch
        />
      </Space>
    </Card>
  )
}

export default TokenSelection
