import { Col, Divider, Empty, Row } from 'antd'
import OfferCard from './offerCard'

import { filterAction, useAction } from 'providers/action.provider'
import { filterStatus, useStatus } from 'providers/status.provider'
import {
  filterPartneredToken,
  filterPaymentMethod,
  useSymbol,
} from 'providers/symbol.provider'
import { sortPrice, sortRecent, useSort } from 'providers/sort.provider'
import { useOrderSelector } from 'hooks/useOrder'
import { OrderState } from 'store/order.reducer'

const OfferList = () => {
  const { action } = useAction()
  const { status } = useStatus()
  const { paymentMethod, partneredToken } = useSymbol()
  const { sort } = useSort()
  const orders = useOrderSelector((orders: OrderState) => {
    orders = filterAction(action)(orders)
    orders = filterStatus(status)(orders)
    orders = filterPaymentMethod(action, paymentMethod)(orders)
    orders = filterPartneredToken(action, partneredToken)(orders)
    orders = sortPrice(action, sort)(orders)
    orders = sortRecent(sort)(orders)
    return orders
  })

  return (
    <Row gutter={[24, 24]} justify="center">
      {!Object.keys(orders).length && (
        <Col>
          <Empty />
        </Col>
      )}
      {Object.keys(orders).map((orderAddress, i) => (
        <Col key={orderAddress} span={24}>
          <Row gutter={[12, 12]}>
            {i > 0 && (
              <Col span={24}>
                <Divider style={{ marginBottom: 12, marginTop: 12 }} />
              </Col>
            )}
            <Col span={24}>
              <OfferCard orderAddress={orderAddress} />
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  )
}

export default OfferList
