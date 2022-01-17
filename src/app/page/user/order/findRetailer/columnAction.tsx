import { useDispatch } from 'react-redux'

import { Button } from 'antd'

import { OrderStep } from 'app/constant'
import { setOrderStep } from 'app/model/main.controller'
import { setRetailerAddress } from 'app/model/order.controller'
import { AppDispatch } from 'app/model'

const ColumnAction = ({ retailerAddress }: { retailerAddress: string }) => {
  const dispatch = useDispatch<AppDispatch>()

  const onSelectRetailer = () => {
    dispatch(setRetailerAddress(retailerAddress))
    dispatch(setOrderStep(OrderStep.Confirm))
  }

  return (
    <Button size="small" type="primary" onClick={onSelectRetailer} block>
      Select
    </Button>
  )
}

export default ColumnAction
