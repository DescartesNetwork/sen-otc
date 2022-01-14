import { ORDER_STATE_CODE } from 'app/constant'
import CancelAction from './cancelAction'
import RedeemAction from './redeemAction'

const ActionHistory = ({ state = 0 }: { state?: number }) => {
  if (state === ORDER_STATE_CODE.PENDING)
    return <CancelAction onClick={() => {}} />
  if (state === ORDER_STATE_CODE.APPROVED)
    return <RedeemAction onClick={() => {}} />
  return null
}

export default ActionHistory
