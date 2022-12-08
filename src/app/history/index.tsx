import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import HistoryTable from './historyTable'
import Portfolio from './portfolio'
import Filter from './filter'

import { ActionProvider } from 'providers/action.provider'
import { SymbolProvider } from 'providers/symbol.provider'
import { SortProvider } from 'providers/sort.provider'

const History = () => {
  const navigate = useNavigate()

  return (
    <ActionProvider>
      <SymbolProvider>
        <SortProvider>
          <MaxWidthLayout>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Space>
                  <Button
                    size="large"
                    type="text"
                    icon={<IconSax name="ArrowLeft2" />}
                    onClick={() => navigate('/home')}
                    style={{ marginLeft: -8 }}
                  />
                  <Typography.Title level={2}>
                    Transaction History
                  </Typography.Title>
                </Space>
              </Col>
              <Col xs={24} sm={12}></Col>
              <Col xs={24} sm={12}>
                <Portfolio />
              </Col>
              <Col span={24}>
                <Filter />
              </Col>
              <Col span={24}>
                <HistoryTable />
              </Col>
            </Row>
          </MaxWidthLayout>
        </SortProvider>
      </SymbolProvider>
    </ActionProvider>
  )
}

export default History
