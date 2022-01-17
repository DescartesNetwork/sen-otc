import { Col, Row, Select, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { useAskMints } from 'app/hooks/useAskMints'
import { useBidMints } from 'app/hooks/useBidMints'
import { FilterOrderSet, ALL } from 'app/constant'

const CoinFilterHistory = ({
  orderState,
  onSelect = () => {},
}: {
  orderState: FilterOrderSet
  onSelect: (value: FilterOrderSet) => void
}) => {
  const { bidMints } = useBidMints()
  const { askMints } = useAskMints()
  const coinOptions = [...bidMints, ...askMints]

  const handleOnChange = (value: string) => {
    if (!orderState) return
    onSelect({ ...orderState, coin: value })
  }
  return (
    <Row className="filter-history">
      <Col span={24}>
        <Typography.Text type="secondary">Coin</Typography.Text>
      </Col>
      <Col span={24}>
        <Select value={orderState?.coin} onChange={handleOnChange} size="small">
          <Select.Option key={ALL}>All</Select.Option>
          {coinOptions.map((item) => (
            <Select.Option key={item}>
              <Space>
                <MintAvatar mintAddress={item} />
                <MintSymbol mintAddress={item} />
              </Space>
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}
export default CoinFilterHistory
