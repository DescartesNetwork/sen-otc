import { Col, Row, Space, Typography } from 'antd'
import BuySellFilter from 'components/filters/buySellFilter'
import StatusFilter from 'components/filters/statusFilter'
import SortButton from 'components/sortButton'
import { TokenSelectionLite } from 'components/tokenSelect'

import configs from 'configs'
import { useAction } from 'providers/action.provider'
import { SortedBy, useSort } from 'providers/sort.provider'
import { useStatus } from 'providers/status.provider'
import { useSymbol } from 'providers/symbol.provider'
import { useEffect } from 'react'

const {
  otc: { acceptedPayments, partneredTokens },
} = configs

const Filter = () => {
  const { action, setAction } = useAction()
  const { status, setStatus } = useStatus()
  const { paymentMethod, setPaymentMethod, partneredToken, setPartneredToken } =
    useSymbol()
  const { sort, setSort } = useSort()

  useEffect(() => {
    setSort(SortedBy.AscendingRecent)
  }, [setSort])

  return (
    <Row gutter={[12, 12]} align="top">
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Action</Typography.Text>
          <BuySellFilter value={action} onChange={setAction} />
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Status</Typography.Text>
          <StatusFilter
            value={status}
            onChange={setStatus}
            style={{ marginTop: 4 }}
          />
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Token</Typography.Text>
          <TokenSelectionLite
            options={['All', ...partneredTokens.map(({ symbol }) => symbol)]}
            value={partneredToken}
            onChange={setPartneredToken}
            style={{ width: 96, marginTop: 4 }}
          />
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Payment</Typography.Text>
          <TokenSelectionLite
            options={acceptedPayments.map(({ symbol }) => symbol)}
            value={paymentMethod}
            onChange={setPaymentMethod}
            prefix="By:"
            style={{ width: 116, marginTop: 4 }}
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
            style={{ marginTop: 4 }}
            size="large"
          />
        </Space>
      </Col>
    </Row>
  )
}

export default Filter
