import { useState } from 'react'

import { Row, Col, Typography, Empty } from 'antd'
import OrderCard from 'app/components/orderCard'
import Watcher from 'app/components/watcher'
import CoinFilterHistory from 'app/components/filterHistory/coinFilterHistory'
import { ALL } from 'app/constant'
import { useFilteredOrders } from 'app/hooks/useFilteredOrders'

const Widget = () => {
  const [selectedCoin, setSelectedCoin] = useState(ALL)

  const listOrderAddress = useFilteredOrders({ coin: selectedCoin })

  return (
    <Watcher>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col flex="auto">
              <Typography.Text>
                {listOrderAddress?.length | 0} Order OTC
              </Typography.Text>
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
                  <OrderCard orderId={address} widget />
                </Col>
              ))}
            </Row>
          )}
        </Col>
        <Col span={24} /> {/* Safe space */}
      </Row>
    </Watcher>
  )
}

export default Widget
