import { Button } from 'antd'

const RedeemAction = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button size="small" type="primary" onClick={onClick} block>
      Redeem
    </Button>
  )
}

export default RedeemAction
