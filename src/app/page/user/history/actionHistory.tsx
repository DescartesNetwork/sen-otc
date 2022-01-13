import { Button } from 'antd'
import { OrderState } from 'app/constant'

const ActionHistory = ({ state = 0 }: { state?: number }) => {
  if (state === OrderState.Pending)
    return (
      <Button ghost onClick={() => {}} block>
        Cancel
      </Button>
    )
  if (state === OrderState.Approved)
    return (
      <Button type="primary" onClick={() => {}} block>
        Redeem
      </Button>
    )
  return null
}

export default ActionHistory
