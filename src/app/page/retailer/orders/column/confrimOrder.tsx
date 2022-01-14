import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const ConfirmOrder = ({
  orderData,
  onClose,
}: {
  orderData: any
  onClose: (visible: boolean) => void
}) => {
  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row align="middle" justify="space-between">
          <Col>
            <Space direction="vertical">
              <Typography.Text>Pay</Typography.Text>
              <Space>
                <MintAvatar mintAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ" />
                <Typography.Text>
                  <MintSymbol mintAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ" />
                </Typography.Text>
              </Space>
              <Typography.Title level={4}>10</Typography.Title>
            </Space>
          </Col>
          <Col>
            <IonIcon name="arrow-forward-outline" style={{ fontSize: 24 }} />
          </Col>
          <Col>
            <Space direction="vertical">
              <Typography.Text>Receive</Typography.Text>
              <Space>
                <MintAvatar mintAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ" />
                <Typography.Text>
                  <MintSymbol
                    separator=" + "
                    mintAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ"
                  />
                </Typography.Text>
              </Space>
              <Typography.Title level={4}>10</Typography.Title>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card
          bordered={false}
          className="order-confirm-card"
          style={{ boxShadow: 'none', borderRadius: 8 }}
          bodyStyle={{ padding: 16 }}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Approve day
                  </Typography.Text>
                </Col>
                <Typography.Text>15/12/2021</Typography.Text>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Market price
                  </Typography.Text>
                </Col>
                <Typography.Text>1 USDC = 39.54 SNTR</Typography.Text>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Network fee
                  </Typography.Text>
                </Col>
                <Col>0.0001%</Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space size={4}>
          <Button>Reject</Button>
          <Button type="primary">Approve</Button>
        </Space>
      </Col>
    </Row>
  )
}

export default ConfirmOrder
