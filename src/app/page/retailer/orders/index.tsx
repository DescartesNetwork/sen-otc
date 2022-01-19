import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useUI, useWallet } from '@senhub/providers'
import { utils } from '@senswap/sen-js'

import { Col, Row, Typography, Table, Empty } from 'antd'
import { ORDER_COLUMN } from './column'
import FilterHistory from 'app/components/filterHistory'
import OrderCard from 'app/page/retailer/orders/orderCard'

import { ALL, FilterOrderSet, ORDER_STATE_CODE } from 'app/constant'
import { useFilterOrders } from 'app/hooks/useFilter'
import { AppState } from 'app/model'
import { useMarketPrice } from 'app/hooks/useMarketPrice'
import { MintSymbol } from 'shared/antd/mint'
import { numeric } from 'shared/util'

const Order = () => {
  const { orders, retailers } = useSelector((state: AppState) => state)
  const [bidAdress, setBidAddress] = useState('')
  const [askAdress, setAskAddress] = useState('')
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
  const { marketPrice } = useMarketPrice(bidAdress, askAdress)

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
    if (!myOrders.length || bidAdress || askAdress) return
    const { mint_bid, mint_ask } = retailers[myOrders[0].retailer]
    setBidAddress(mint_bid)
    setAskAddress(mint_ask)
  }, [askAdress, bidAdress, myOrders, retailers])

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
                <Typography.Text>
                  <MintSymbol mintAddress={bidAdress} />/
                  <MintSymbol mintAddress={askAdress} /> ={' '}
                  {numeric(marketPrice).format('0,0.[00]')}
                </Typography.Text>
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
              <Empty />
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

export default Order
