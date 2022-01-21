import { useState } from 'react'

import { Button, Card, Col, Input, Row, Select, SelectProps, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { useSearchTokens } from 'app/hooks/useSearchTokens'

export const SearchInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
  return (
    <Card
      className="account-card"
      style={{ borderRadius: 8, margin: 8, boxShadow: 'unset' }}
      bodyStyle={{ padding: 6 }}
    >
      <Input
        placeholder="Search"
        value={value}
        size="small"
        bordered={false}
        prefix={
          <Button
            type="text"
            style={{ marginLeft: -7 }}
            size="small"
            onClick={value ? () => onChange('') : undefined}
            icon={
              <IonIcon
                name={value ? 'close-outline' : 'search-outline'}
                style={{ pointerEvents: 'none' }}
              />
            }
          />
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </Card>
  )
}

const TokenSelect = ({
  tokens,
  search = false,
  ...rest
}: {
  tokens: string[]
  search?: boolean
  selectFist?: boolean
} & SelectProps) => {
  const [keyword, setKeyword] = useState('')
  const searchedTokens = useSearchTokens(tokens, keyword)

  return (
    <Select
      {...rest}
      dropdownRender={(menu) => (
        <Row gutter={[8, 8]}>
          {search && (
            <Col span={24}>
              <SearchInput value={keyword} onChange={setKeyword} />
            </Col>
          )}
          <Col span={24}>{menu}</Col>
        </Row>
      )}
    >
      {searchedTokens.map((tokenAddress) => (
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
