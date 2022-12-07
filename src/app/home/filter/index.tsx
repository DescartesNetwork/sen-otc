import { Badge, Button, Col, Row, Space } from 'antd'
import BuySellFilter from 'components/filters/buySellFilter'
import { TokenSelectionLite } from 'components/tokenSelect'
import Search from './search'
import Sort from './sort'
import StatusFilter from './statusFilter'

import configs from 'configs'
import { useAction } from 'providers/action.provider'
import { useSymbol } from 'providers/symbol.provider'
import { useSearch } from 'providers/search.provider'
import { useSort } from 'providers/sort.provider'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs

const Filter = () => {
  const { action, setAction } = useAction()
  const { paymentMethod, setPaymentMethod, partneredToken, setPartneredToken } =
    useSymbol()
  const { keyword, setKeyword } = useSearch()
  const { sort, setSort } = useSort()

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Row gutter={[12, 12]} align="middle" wrap={false}>
          <Col>
            <BuySellFilter value={action} onChange={setAction} />
          </Col>
          <Col flex="auto">
            <Space size={0} style={{ width: '100%', overflow: 'auto' }}>
              {['All', ...partneredTokens.map(({ symbol }) => symbol)].map(
                (symbol) => (
                  <Badge
                    key={symbol}
                    color="black"
                    offset={[-8, 8]}
                    dot={partneredToken === symbol}
                  >
                    <Button
                      type="text"
                      onClick={() => setPartneredToken(symbol)}
                    >
                      {symbol}
                    </Button>
                  </Badge>
                ),
              )}
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]} align="middle">
          <Col>
            <Search keyword={keyword} onKeyword={setKeyword} />
          </Col>
          <Col>
            <TokenSelectionLite
              options={acceptedPayments.map(({ symbol }) => symbol)}
              value={paymentMethod}
              onChange={setPaymentMethod}
              prefix="By:"
              style={{ width: 116 }}
            />
          </Col>
          <Col>
            <StatusFilter />
          </Col>
          <Col>
            <Sort sort={sort} onSort={setSort} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Filter
