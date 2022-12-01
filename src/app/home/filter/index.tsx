import { Badge, Button, Col, Row, Space } from 'antd'
import Search from './search'
import Sort from './sort'
import BuySellFilter from 'components/filters/buySellFilter'
import { TokenSelectionLite } from 'components/tokenSelect'
import StatusFilter from './statusFilter'

import configs from 'configs'
import {
  useAction,
  useKeyword,
  usePartneredToken,
  usePaymentMethod,
  useSort,
} from 'hooks/useFilter'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs

const Filter = () => {
  const { action, setAction } = useAction()
  const { paymentMethod, setPaymentMethod } = usePaymentMethod()
  const { partneredToken, setPartneredToken } = usePartneredToken()
  const { keyword, setKeyword } = useKeyword()
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
