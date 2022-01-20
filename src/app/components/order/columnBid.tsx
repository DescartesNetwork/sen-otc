import { useSelector } from 'react-redux'

import OrderPriceCell from 'app/components/orderPriceCell'

import { AppState } from 'app/model'

const ColumnBid = ({ orderId }: { orderId: string }) => {
  const {
    orders: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)

  const { retailer, bid_amount } = orderData || {}
  const { mint_bid } = retailers[retailer] || {}

  return <OrderPriceCell amount={bid_amount} mintAddress={mint_bid} />
}

export default ColumnBid
