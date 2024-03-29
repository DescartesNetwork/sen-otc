import { useEffect } from 'react'

import { Col, Row, Space, Typography } from 'antd'
import SortButton from 'components/sortButton'
import { TokenSelectionLite } from 'components/tokenSelect'

import configs from 'configs'
import { SortedBy, useSort } from 'providers/sort.provider'
import { useSymbol } from 'providers/symbol.provider'

const {
  otc: { partneredTokens },
} = configs

const Filter = () => {
  const { partneredToken, setPartneredToken } = useSymbol()
  const { sort, setSort } = useSort()

  useEffect(() => {
    setSort(SortedBy.AscendingRecent)
  }, [setSort])

  return (
    <Row gutter={[12, 12]} align="top">
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Token</Typography.Text>
          <TokenSelectionLite
            options={['All', ...partneredTokens.map(({ symbol }) => symbol)]}
            value={partneredToken}
            onChange={setPartneredToken}
          />
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Sorted By</Typography.Text>
          <SortButton
            title="Recent"
            value={sort}
            onChange={setSort}
            size="large"
          />
        </Space>
      </Col>
    </Row>
  )
}

export default Filter
