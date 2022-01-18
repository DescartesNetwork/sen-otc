import { Col, Row, Select, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { useAskMints } from 'app/hooks/useAskMints'
import { useBidMints } from 'app/hooks/useBidMints'
import { ALL } from 'app/constant'

const CoinFilterHistory = ({
  label = true,
  coin,
  onSelect = () => {},
}: {
  label?: boolean
  coin: string
  onSelect: (value: string) => void
}) => {
  const { bidMints } = useBidMints()
  const { askMints } = useAskMints()
  const coinOptions = bidMints.concat(
    askMints.filter((askAddr) => !bidMints.includes(askAddr)),
  )

  return (
    <Row className="filter-history">
      {label && (
        <Col span={24}>
          <Typography.Text type="secondary">Coin</Typography.Text>
        </Col>
      )}
      <Col span={24}>
        <Select value={coin} onChange={onSelect} size="small">
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
