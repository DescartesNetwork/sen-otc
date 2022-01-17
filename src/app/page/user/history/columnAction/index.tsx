import { useSelector } from 'react-redux'

import CancelAction from './cancelAction'
import RedeemAction from './redeemAction'

import { ORDER_STATE_CODE } from 'app/constant'
import { AppState } from 'app/model'

const ColumnAction = ({ orderAddress }: { orderAddress: string }) => {
  const {
    orders: {
      [orderAddress]: { state },
    },
  } = useSelector((state: AppState) => state)

  if (state === ORDER_STATE_CODE.PENDING)
    return <CancelAction orderAddress={orderAddress} />
  if (state === ORDER_STATE_CODE.APPROVED)
    return <RedeemAction orderAddress={orderAddress} />
  return null
}

export default ColumnAction
