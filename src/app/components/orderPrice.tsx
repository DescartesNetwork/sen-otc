import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Space, Typography } from 'antd'
import { AppState } from 'app/model'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const PriceCell = ({
  amount,
  mintAddress,
}: {
  amount: bigint
  mintAddress: string
}) => {
  return (
    <Space>
      <Typography.Text>{utils.undecimalize(amount, 0)}</Typography.Text>
      <MintSymbol mintAddress={mintAddress} />
      <MintAvatar mintAddress={mintAddress} />
    </Space>
  )
}

const Price = ({ orderId }: { orderId: string }) => {
  const {
    orders: { [orderId]: orderData },
    retailers,
  } = useSelector((state: AppState) => state)
  const retailerData = retailers[orderData.retailer]

  return (
    <Space>
      <PriceCell
        amount={orderData.ask_amount}
        mintAddress={retailerData.mint_ask}
      />
      <IonIcon name="arrow-forward-outline" />
      <PriceCell
        amount={orderData.bid_amount}
        mintAddress={retailerData.mint_bid}
      />
    </Space>
  )
}

export default Price
