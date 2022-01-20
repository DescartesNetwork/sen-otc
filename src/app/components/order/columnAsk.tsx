import { useSelector } from 'react-redux'

import OrderMintInfo from 'app/components/orderMintInfo'

import { AppState } from 'app/model'

const ColumnAsk = ({ orderId }: { orderId: string }) => {
  const {
    orders: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)

  const { retailer, ask_amount } = orderData || {}
  const { mint_ask } = retailers[retailer] || {}

  return <OrderMintInfo amount={ask_amount} mintAddress={mint_ask} />
}

export default ColumnAsk
