import { useState } from 'react'

import { Row, Col, Typography, Empty } from 'antd'
import OrderCard from 'app/components/orderCard'
import StatusFilterHistory from 'app/components/filterHistory/statusFilter'

import Watcher from 'app/components/watcher'
import { ALL } from 'app/constant'
import { useFilteredOrders } from 'app/hooks/useFilteredOrders'

const Widget = () => {
  const [selectedStatus, setSelectedStatus] = useState(ALL)

  const listOrderAddress = useFilteredOrders({ status: selectedStatus })

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
              <StatusFilterHistory
                label={false}
                status={selectedStatus}
                onSelect={setSelectedStatus}
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
