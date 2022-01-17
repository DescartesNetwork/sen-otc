import { useSelector } from 'react-redux'

import { Card, Col, Row, Typography } from 'antd'
import RowInfo from './rowInfo'
import { MintSymbol } from 'shared/antd/mint'

import { AppState } from 'app/model'
import { numeric } from 'shared/util'
import { useMarketPrice } from 'app/hooks/useMarketPrice'
import { useRetailerFee } from 'app/hooks/useRetailerFee'

const OrderInfo = () => {
  const {
    order: { bidMintAddress, askMintAddress, retailerAddress },
  } = useSelector((state: AppState) => state)
  const { marketPrice } = useMarketPrice()
  const { fee } = useRetailerFee(retailerAddress)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card
          className="order-confirm-card"
          bodyStyle={{ padding: 16 }}
          bordered={false}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Market price
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    1 <MintSymbol mintAddress={bidMintAddress} /> ={' '}
                    {numeric(marketPrice).format('0,0.[00]')}{' '}
                    <MintSymbol mintAddress={askMintAddress} />
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <RowInfo
                label="Retailer fee"
                value={numeric(fee).format('0,0.[00]%')}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
export default OrderInfo
