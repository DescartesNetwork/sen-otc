// import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Row, Col, Typography } from 'antd'
import OrderCard from 'app/page/user/history/orderCard'
import { AppState } from 'app/model'
import Watcher from 'app/components/watcher'
// import CoinFilterHistory from 'app/components/filterHistory/coinFilterHistory'

const Widget = () => {
  // const [selectedCoin, setSelectedCoin] = useState('')
  const { orders } = useSelector((state: AppState) => state)

  return (
    <Watcher>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col flex="auto">
              <Typography.Text>5 Order</Typography.Text>
            </Col>
            <Col>
              {/* <CoinFilterHistory orderState={selectedCoin}  onSelect={setSelectedCoin}/> */}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {Object.keys(orders)?.map((address) => (
              <Col span={24} key={address}>
                <OrderCard orderId={address} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Watcher>
  )
}

export default Widget
