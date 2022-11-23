import IconSax from '@sentre/antd-iconsax'
import {
  Avatar,
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Space,
  Typography,
} from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'

import { ACCEPTED_PAYMENTS } from 'helpers/acceptedPayments'
import { numeric } from 'helpers/util'

const sol = ACCEPTED_PAYMENTS[0]
const stable = ACCEPTED_PAYMENTS[1]

const CreateOffer = () => {
  return (
    <MaxWidthLayout level={3}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={2}>Create an Offer</Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Row gutter={[8, 8]} wrap={false}>
                <Col flex="auto">
                  <Typography.Text type="secondary">BID</Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type="secondary">
                    Balance: {numeric(1928639824).format('0,0.[000]')}{' '}
                    {sol.symbol}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Input
                size="large"
                prefix={
                  <Card
                    bodyStyle={{
                      padding: 4,
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                    }}
                    bordered={false}
                  >
                    <Space>
                      <Avatar src={sol.url} />
                      <Typography.Title level={5}>
                        {sol.symbol}
                      </Typography.Title>
                      <IconSax name="ArrowDown2" style={{ marginRight: 8 }} />
                    </Space>
                  </Card>
                }
              />
            </Col>
            <Col span={24}>
              <Typography.Text type="secondary">
                Market Price: $0
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">ASK</Typography.Text>
            </Col>
            <Col span={24}>
              <Input
                size="large"
                prefix={
                  <Card
                    bodyStyle={{
                      padding: 4,
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                    }}
                    bordered={false}
                  >
                    <Space>
                      <Avatar src={stable.url} />
                      <Typography.Title level={5}>
                        {stable.symbol}
                      </Typography.Title>
                      <IconSax name="ArrowDown2" style={{ marginRight: 8 }} />
                    </Space>
                  </Card>
                }
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">STARTED AT</Typography.Text>
            </Col>
            <Col span={24}>
              <DatePicker size="large" style={{ width: '100%' }} />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">ENDED AT</Typography.Text>
            </Col>
            <Col span={24}>
              <DatePicker size="large" style={{ width: '100%' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default CreateOffer
