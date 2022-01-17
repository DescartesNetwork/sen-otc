import { useSelector } from 'react-redux'

import CancelAction from './cancelAction'
import RedeemAction from './redeemAction'

import { ORDER_STATE_CODE } from 'app/constant'
import { AppState } from 'app/model'

const ActionHistory = ({ address }: { address: string }) => {
  const {
    orders: {
      [address]: { state },
    },
  } = useSelector((state: AppState) => state)

  if (state === ORDER_STATE_CODE.PENDING)
    return <CancelAction orderAddress={address} />
  if (state === ORDER_STATE_CODE.APPROVED)
    return <RedeemAction orderAddress={address} />
  return null
}

export default ActionHistory
