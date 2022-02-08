import { useUI } from '@senhub/providers'
import { Card, Col, Divider, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import OrderDetails from '../orderDetails'
import Ask from './ask'
import Bid from './bid'
import MarketPrice from './marketPrice'
import SendAmount from './sendAmount'

const NewOrder = () => {
  const {
    ui: { width },
  } = useUI()
  const isMobile = width < 768

  return (
    <Card
      bordered={false}
      className="order-card"
      style={{ boxShadow: 'unset', borderRadius: 16 }}
    >
      <Row gutter={[48, 46]}>
        <Col span={24} className="order-ticket">
          <Row
            gutter={[48, 16]}
            style={{ padding: '16px 0', background: '#5D6CCF' }}
          >
            <Col xs={24} md={12}>
              <Typography.Text style={{ color: '#fff' }}>
                Book order
              </Typography.Text>
            </Col>
            <Col xs={0} md={12}>
              <Typography.Text style={{ color: '#fff' }}>
                Order details
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col span={24} />
        <Col span={24}>
          <Row gutter={[48, 16]}>
            <Col xs={24} md={12}>
              <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col span={10}>
                  <Bid />
                </Col>
                <Col>
                  <IonIcon name="swap-horizontal-outline" />
                </Col>
                <Col span={10}>
                  <Ask />
                </Col>
                <Col span={24}>
                  <SendAmount />
                </Col>
                <Col span={24}>
                  <MarketPrice />
                </Col>
              </Row>
            </Col>
            {isMobile && (
              <Col span={24}>
                <Divider style={{ margin: 0, background: '#A6A7AD' }} dashed />
              </Col>
            )}
            <Col xs={24} md={12}>
              <OrderDetails />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default NewOrder
