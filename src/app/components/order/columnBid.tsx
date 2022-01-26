import { useSelector } from 'react-redux'

import OrderMintInfo from 'app/components/orderMintInfo'

import { AppState } from 'app/model'

const ColumnBid = ({ orderId }: { orderId: string }) => {
  const {
    orders: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)

  const { retailer, bid_amount } = orderData || {}
  const { mint_bid } = retailers[retailer] || {}

  return <OrderMintInfo amount={bid_amount} mintAddress={mint_bid} />
}

export default ColumnBid
