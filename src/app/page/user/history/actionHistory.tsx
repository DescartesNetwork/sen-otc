import { useSelector } from 'react-redux'

import CancelAction from './cancelAction'
import RedeemAction from './redeemAction'

import { ORDER_STATE_CODE } from 'app/constant'
import { AppState } from 'app/model'

const ActionHistory = ({ address }: { address: string }) => {
  const {
    history: {
      [address]: { state: stateOrder },
    },
  } = useSelector((state: AppState) => state)

  if (!stateOrder) return null

  if (stateOrder === ORDER_STATE_CODE.PENDING)
    return <CancelAction orderAddress={address} />
  if (stateOrder === ORDER_STATE_CODE.APPROVED)
    return <RedeemAction orderAddress={address} />
  return null
}

export default ActionHistory
