import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import MyOrdersTable from './myOrdersTable'

const MyOffer = () => {
  const navigate = useNavigate()

  return (
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
            <Typography.Title level={2}>My Offer</Typography.Title>
          </Space>
        </Col>
        <Col span={24}>
          <MyOrdersTable />
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default MyOffer
