import { useSelector } from 'react-redux'

import { Space } from 'antd'
import { AppState } from 'app/model'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar } from 'shared/antd/mint'
import OrderPriceCell from './orderPriceCell'

const Price = ({ orderId }: { orderId: string }) => {
  const {
    orders: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)
  const retailerData = retailers[orderData.retailer]
  const { bid_amount, ask_amount } = orderData
  const { mint_ask, mint_bid } = retailerData

  return (
    <Space>
      <OrderPriceCell amount={bid_amount} mintAddress={mint_bid} />
      <MintAvatar mintAddress={mint_bid} />
      <IonIcon name="arrow-forward-outline" />
      <MintAvatar mintAddress={mint_ask} />
      <OrderPriceCell amount={ask_amount} mintAddress={mint_ask} />
    </Space>
  )
}

export default Price
