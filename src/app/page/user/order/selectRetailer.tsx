import { useDispatch } from 'react-redux'

import { Button } from 'antd'
import { OrderStep } from 'app/constant'
import { setOrderStep } from 'app/model/main.controller'

const SelectRetailer = () => {
  const dispatch = useDispatch()

  const onSelectRetailer = () => {
    dispatch(setOrderStep(OrderStep.Confirm))
  }

  return (
    <Button type="primary" onClick={onSelectRetailer}>
      Select
    </Button>
  )
}

export default SelectRetailer
