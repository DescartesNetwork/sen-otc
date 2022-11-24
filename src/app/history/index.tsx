import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import BuySellFilter from 'components/filters/buySellFilter'
import { TokenSelectionLite } from 'components/tokenSelect'
import HistoryTable from './historyTable'
import Portfolio from './portfolio'

import { useAction, useOfferedToken } from 'hooks/useFilter'
import { ACCEPTED_PAYMENTS } from 'helpers/acceptedPayments'

const History = () => {
  const navigate = useNavigate()
  const [action, setAction] = useAction()
  const [offeredToken, setOfferedToken] = useOfferedToken()

  return (
    <MaxWidthLayout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Space direction="vertical">
            <Button
              type="text"
              icon={<IconSax name="ArrowLeft" />}
              onClick={() => navigate('/')}
              style={{ fontWeight: 700 }}
            >
              Back
            </Button>
            <Typography.Title level={2}>Transaction History</Typography.Title>
          </Space>
        </Col>
        <Col xs={24} sm={12}></Col>
        <Col xs={24} sm={12}>
          <Portfolio />
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]} align="top">
            <Col>
              <Space direction="vertical">
                <Typography.Text type="secondary">Action</Typography.Text>
                <BuySellFilter value={action} onChange={setAction} />
              </Space>
            </Col>
            <Col>
              <Space direction="vertical">
                <Typography.Text type="secondary">Token</Typography.Text>
                <TokenSelectionLite
                  options={[
                    'All',
                    ...ACCEPTED_PAYMENTS.map(({ symbol }) => symbol),
                  ]}
                  value={offeredToken}
                  onChange={setOfferedToken}
                  style={{ margin: 4 }}
                />
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <HistoryTable />
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default History
