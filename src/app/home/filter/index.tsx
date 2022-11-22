import IconSax from '@sentre/antd-iconsax'
import {
  Badge,
  Button,
  Col,
  Row,
  Segmented,
  Select,
  Space,
  Typography,
} from 'antd'
import Search from './search'

import { ACCEPTED_PAYMENTS } from 'helpers/acceptedPayments'
import {
  useAction,
  useKeyword,
  useOfferedToken,
  usePaymentMethod,
  useSort,
} from 'hooks/useFilter'
import { OtcAction } from 'store/filter.reducer'

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
            <Segmented
              size="large"
              options={Object.values(OtcAction)}
              value={action}
              style={{ padding: 6 }}
              onChange={(e: any) => setAction(e)}
            />
          </Col>
          <Col>
            <Space size={0}>
              {ACCEPTED_PAYMENTS.map(({ symbol }) => (
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
            <Select
              size="large"
              style={{ borderRadius: 24 }}
              options={ACCEPTED_PAYMENTS.map(({ symbol }) => ({
                value: symbol,
                label: offeredToken === symbol ? `By: ${symbol}` : symbol,
              }))}
              value={offeredToken}
              onChange={setOfferedToken}
              suffixIcon={<IconSax name="ArrowDown2" />}
            />
          </Col>
          <Col>
            <Space>
              <Typography.Text type="secondary">
                Sort by: {sort}
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Filter
