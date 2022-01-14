import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Row, Space, Typography } from 'antd'
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
      <Space size={6}>
        <Typography.Text>
          {utils.undecimalize(BigInt(orderData.ask_amount), 0)}
        </Typography.Text>
        <MintSymbol mintAddress={retailerData.mint_bid} />
        <MintAvatar mintAddress={retailerData.mint_bid} />
        <IonIcon name="arrow-forward-outline" />
        <Typography.Text>
          {utils.undecimalize(BigInt(orderData.bid_amount), 0)}
        </Typography.Text>
        <MintSymbol mintAddress={retailerData.mint_ask} />
        <MintAvatar mintAddress={retailerData.mint_ask} />
      </Space>
    </Row>
  )
}

export default Price
