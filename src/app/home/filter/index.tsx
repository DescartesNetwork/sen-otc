import { Badge, Button, Col, Row, Space } from 'antd'
import Search from './search'

import {
  useAction,
  useKeyword,
  useOfferedToken,
  usePaymentMethod,
  useSort,
} from 'hooks/useFilter'
import Sort from './sort'
import BuySellFilter from 'components/filters/buySellFilter'
import { TokenSelectionLite } from 'components/tokenSelect'

import { ACCEPTED_PAYMENTS } from 'helpers/acceptedPayments'

const SYMBOLS = ACCEPTED_PAYMENTS.map(({ symbol }) => symbol)

const Filter = () => {
  const [action, setAction] = useAction()
  const [paymentMethod, setPaymentMethod] = usePaymentMethod()
  const [offeredToken, setOfferedToken] = useOfferedToken()
  const [keyword, setKeyword] = useKeyword()
  const [sort, setSort] = useSort()

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Row gutter={[12, 12]} align="middle" wrap={false}>
          <Col>
            <BuySellFilter value={action} onChange={setAction} />
          </Col>
          <Col flex="auto">
            <Space size={0} style={{ width: '100%', overflow: 'auto' }}>
              {SYMBOLS.map((symbol) => (
                <Badge
                  key={symbol}
                  color="black"
                  offset={[-8, 8]}
                  dot={paymentMethod === symbol}
                >
                  <Button type="text" onClick={() => setPaymentMethod(symbol)}>
                    {symbol}
                  </Button>
                </Badge>
              ))}
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
              options={SYMBOLS}
              value={offeredToken}
              onChange={setOfferedToken}
              prefix="By:"
              style={{ width: 116 }}
            />
          </Col>
          <Col>
            <TokenSelectionLite
              options={SYMBOLS}
              value={offeredToken}
              onChange={setOfferedToken}
            />
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
