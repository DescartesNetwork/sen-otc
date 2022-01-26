import { useSelector } from 'react-redux'

import Cancel from './cancel'
import Redeem from './redeem'
import Detail from './detail'

import { ORDER_STATE_CODE } from 'app/constant/order'
import { AppState } from 'app/model'

const ColumnAction = ({ orderAddress }: { orderAddress: string }) => {
  const {
    orders: { [orderAddress]: orderData },
  } = useSelector((state: AppState) => state)

  switch (orderData?.state) {
    case ORDER_STATE_CODE.PENDING:
      return <Cancel orderAddress={orderAddress} />

    case ORDER_STATE_CODE.APPROVED:
      return <Redeem orderAddress={orderAddress} />

    default:
      return <Detail orderAddress={orderAddress} />
  }
}

export default ColumnAction
