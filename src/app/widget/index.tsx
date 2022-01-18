import { useState } from 'react'

import { Row, Col, Typography, Empty } from 'antd'
import OrderCard from 'app/page/user/history/orderCard'
import Watcher from 'app/components/watcher'
import CoinFilterHistory from 'app/components/filterHistory/coinFilterHistory'
import { ALL } from 'app/constant'
import { useFilterOrders } from 'app/hooks/useFilter'

const Widget = () => {
  const [selectedCoin, setSelectedCoin] = useState(ALL)
  const orderFilters = { coin: selectedCoin, time: 90, status: ALL }

  const listOrderAddress = useFilterOrders(orderFilters)

  return (
    <Watcher>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col flex="auto">
              <Typography.Text>5 Order</Typography.Text>
            </Col>
            <Col style={{ minWidth: 150 }}>
              <CoinFilterHistory
                label={false}
                coin={selectedCoin}
                onSelect={setSelectedCoin}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {!listOrderAddress.length ? (
            <Empty />
          ) : (
            <Row gutter={[24, 24]}>
              {listOrderAddress?.map((address) => (
                <Col span={24} key={address}>
                  <OrderCard orderId={address} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Watcher>
  )
}

export default Widget
