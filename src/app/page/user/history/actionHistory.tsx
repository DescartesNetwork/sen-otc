import { Button } from 'antd'
import { OrderStatus } from './orderHisotryStatus'

const ActionHistory = ({ state = 0 }: { state?: number }) => {
  if (state === OrderStatus.Pending)
    return (
      <Button size="small" ghost onClick={() => {}} block>
        Cancel
      </Button>
    )
  if (state === OrderStatus.Success)
    return (
      <Button size="small" type="primary" onClick={() => {}} block>
        Redeem
      </Button>
    )
  return null
}

export default ActionHistory
