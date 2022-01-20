import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'
import { utils } from '@senswap/sen-js'

import { Col, Row, Table, Empty } from 'antd'
import { ORDER_COLUMN } from './columns'
import FilterHistory from 'app/components/filterHistory'
import OrderCard from 'app/page/retailer/orders/orderCard'

import { OrderFilterOptions } from 'app/constant'
import { ORDER_STATE_CODE } from 'app/constant/order'
import { useFilteredOrders } from 'app/hooks/useFilteredOrders'
import { AppState } from 'app/model'
import { useDevice } from 'app/hooks/useDevice'

const ListOrders = ({
  onSelect = () => {},
  orderFilter,
}: {
  onSelect: (value: OrderFilterOptions) => void
  orderFilter: OrderFilterOptions
}) => {
  const { orders, retailers } = useSelector((state: AppState) => state)
  const [bidAddress, setBidAddress] = useState('')
  const [askAddress, setAskAddress] = useState('')
  const { isMobile, isDesktop } = useDevice()

  const listOrderAddress = useFilteredOrders(orderFilter)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const dataSource = useMemo(() => {
    return listOrderAddress.map((addr) => {
      return { ...orders[addr], address: addr }
    })
  }, [listOrderAddress, orders])

  const myOrders = dataSource
    .filter((order) => {
      return retailers[order.retailer].owner === walletAddress
    })
    .sort((order1, order2) => {
      const orderState1Check = order1.state === ORDER_STATE_CODE.PENDING
      const orderState2Check = order2.state === ORDER_STATE_CODE.PENDING
      const timeCheck =
        Number(utils.undecimalize(order2.created_at, 0)) -
        Number(utils.undecimalize(order1.created_at, 0))

      if (orderState1Check && orderState2Check) {
        return timeCheck
      }
      if (orderState1Check && !orderState2Check) {
        return -1
      }
      if (!orderState1Check && orderState2Check) {
        return 1
      }
      return timeCheck
    })

  const handleClick = (retailer: string) => {
    const { mint_bid, mint_ask } = retailers[retailer]
    setBidAddress(mint_bid)
    setAskAddress(mint_ask)
  }

  useEffect(() => {
    if (!myOrders.length || bidAddress || askAddress) return
    const { mint_bid, mint_ask } = retailers[myOrders[0].retailer]
    setBidAddress(mint_bid)
    setAskAddress(mint_ask)
  }, [askAddress, bidAddress, myOrders, retailers])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={12} align="bottom">
          {!isMobile && (
            <Col flex="auto">
              <FilterHistory
                onSelect={(value) => {
                  onSelect(value)
                }}
                filterValues={orderFilter}
              />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24}>
        {isDesktop ? (
          <Table
            className="scrollbar"
            columns={ORDER_COLUMN}
            dataSource={myOrders}
            rowClassName={(record, index) =>
              index % 2 ? 'odd-row' : 'even-row'
            }
            onRow={(record) => {
              return {
                onClick: () => handleClick(record.retailer),
              }
            }}
            pagination={false}
            rowKey={(record) => record.address}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {!myOrders.length ? (
              <Col span={24}>
                <Empty />
              </Col>
            ) : (
              myOrders.map((data) => (
                <Col span={24} key={data.address}>
                  <OrderCard
                    onClick={() => handleClick(data.retailer)}
                    orderAddress={data.address}
                  />
                </Col>
              ))
            )}
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default ListOrders
