import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import MyOrdersTable from './myOrdersTable'
import { ActionProvider } from 'providers/action.provider'
import Filter from './filter'
import { StatusProvider } from 'providers/status.provider'
import { SymbolProvider } from 'providers/symbol.provider'
import { SortProvider } from 'providers/sort.provider'

const MyOffer = () => {
  const navigate = useNavigate()

  return (
    <ActionProvider>
      <StatusProvider>
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
                    <Typography.Title level={2}>My Offers</Typography.Title>
                  </Space>
                </Col>
                <Col span={24}>
                  <Filter />
                </Col>
                <Col span={24}>
                  <MyOrdersTable />
                </Col>
              </Row>
            </MaxWidthLayout>
          </SortProvider>
        </SymbolProvider>
      </StatusProvider>
    </ActionProvider>
  )
}

export default MyOffer
