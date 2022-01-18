import { useSelector } from 'react-redux'

import CancelAction from './cancelAction'
import RedeemAction from './redeemAction'
import ViewDetailAction from './viewDetailAction'

import { ORDER_STATE_CODE } from 'app/constant'
import { AppState } from 'app/model'

const ColumnAction = ({ orderAddress }: { orderAddress: string }) => {
  const {
    orders: { [orderAddress]: orderData },
  } = useSelector((state: AppState) => state)

  if (orderData?.state === ORDER_STATE_CODE.PENDING)
    return <CancelAction orderAddress={orderAddress} />
  if (orderData?.state === ORDER_STATE_CODE.APPROVED)
    return <RedeemAction orderAddress={orderAddress} />
  return <ViewDetailAction orderAddress={orderAddress} />
}

export default ColumnAction
