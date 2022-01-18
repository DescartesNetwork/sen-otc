import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useUI, useWallet } from '@senhub/providers'

import { Col, Row, Typography, Table } from 'antd'
import { ORDER_COLUMN } from './column'
import FilterHistory from 'app/components/filterHistory'
import OrderCard from 'app/page/retailer/orders/orderCard'

import { ALL, FilterOrderSet } from 'app/constant'
import { useFilterOrders } from 'app/hooks/useFilter'
import { AppState } from 'app/model'

const Order = () => {
  const { orders, retailers } = useSelector((state: AppState) => state)
  const [orderFilter, setOrderFilter] = useState<FilterOrderSet>({
    coin: ALL,
    time: 7,
    status: ALL,
  })
  const {
    ui: { width, infix },
  } = useUI()
  const desktop = width > 1200
  const isMobile = infix === 'xs'
  const colSpan = isMobile ? 24 : undefined
  const flexType = isMobile ? 'auto' : undefined
  const listOrderAddress = useFilterOrders(orderFilter)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const dataSource = useMemo(() => {
    return listOrderAddress.map((addr) => {
      return { ...orders[addr], address: addr }
    })
  }, [listOrderAddress, orders])

  const filterData = dataSource.filter((order) => {
    return retailers[order.retailer].owner === walletAddress
  })

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={12} align="bottom">
          {!isMobile && (
            <Col flex="auto">
              <FilterHistory
                onSelect={(value) => {
                  setOrderFilter(value)
                }}
                filterValues={orderFilter}
              />
            </Col>
          )}
          <Col span={colSpan}>
            <Row justify="end">
              <Col flex={flexType}>
                <Typography.Text type="secondary">Market price</Typography.Text>
              </Col>
              {!isMobile && <Col span={24} />}
              <Col>
                <Typography.Text>SNTR/USDC = 0.02567</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {desktop ? (
          <Table
            className="scrollbar"
            columns={ORDER_COLUMN}
            dataSource={filterData}
            rowClassName={(record, index) =>
              index % 2 ? 'odd-row' : 'even-row'
            }
            pagination={false}
            rowKey={(record) => record.address}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {filterData.map((data) => (
              <Col span={24} key={data.address}>
                <OrderCard orderId={data.address} />
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default Order
