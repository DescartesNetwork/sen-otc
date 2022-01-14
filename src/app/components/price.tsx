import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Row } from 'antd'
import { AppState } from 'app/model'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const Price = ({ orderId }: { orderId: string }) => {
  const {
    history: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)
  const retailerData = retailers[orderData.retailer]
  return (
    <Row>
      ${utils.undecimalize(BigInt(orderData.ask_amount), 0)}&nbsp;
      <MintSymbol mintAddress={retailerData.mint_bid} />
      &nbsp;
      <MintAvatar mintAddress={retailerData.mint_bid} />
      &nbsp;
      <IonIcon name="arrow-forward-outline" />
      &nbsp; ${utils.undecimalize(BigInt(orderData.bid_amount), 0) + ' '}&nbsp;
      <MintSymbol mintAddress={retailerData.mint_ask} />
      &nbsp;
      <MintAvatar mintAddress={retailerData.mint_ask} />
    </Row>
  )
}

export default Price
