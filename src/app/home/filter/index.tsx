import { useEffect } from 'react'

import { Badge, Button, Col, Row, Space } from 'antd'
import BuySellFilter from 'components/filters/buySellFilter'
import { TokenSelectionLite } from 'components/tokenSelect'
import StatusFilter from 'components/filters/statusFilter'
import Search from './search'
import Sort from './sort'

import configs from 'configs'
import { useAction } from 'providers/action.provider'
import { useSymbol } from 'providers/symbol.provider'
import { useSearch } from 'providers/search.provider'
import { useSort } from 'providers/sort.provider'
import { OrderStatus, useStatus } from 'providers/status.provider'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs

const Filter = () => {
  const { action, setAction } = useAction()
  const { paymentMethod, setPaymentMethod, partneredToken, setPartneredToken } =
    useSymbol()
  const { keyword, setKeyword } = useSearch()
  const { sort, setSort } = useSort()
  const { status, setStatus } = useStatus()

  useEffect(() => {
    setStatus(OrderStatus.Active)
  }, [setStatus])

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
            <StatusFilter value={status} onChange={setStatus} />
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
