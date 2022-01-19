import { useState } from 'react'

import { Button, Card, Col, Input, Row, Select, SelectProps, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { useSearchTokens } from 'app/hooks/useSearchTokens'

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
              <Card
                className="account-card"
                style={{ borderRadius: 8, margin: 8, boxShadow: 'unset' }}
                bodyStyle={{ padding: 6 }}
              >
                <Input
                  placeholder="Search"
                  value={keyword}
                  size="small"
                  bordered={false}
                  prefix={
                    <Button
                      type="text"
                      style={{ marginLeft: -7 }}
                      size="small"
                      onClick={keyword ? () => setKeyword('') : undefined}
                      icon={
                        <IonIcon
                          name={keyword ? 'close-outline' : 'search-outline'}
                        />
                      }
                    />
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setKeyword(e.target.value)
                  }
                />
              </Card>
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
