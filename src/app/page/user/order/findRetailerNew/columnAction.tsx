import { useDispatch } from 'react-redux'

import { Button } from 'antd'

import { setRetailerAddress } from 'app/model/order.controller'
import { AppDispatch } from 'app/model'
import { onHandleModalRetailer } from 'app/model/main.controller'

const ColumnAction = ({ retailerAddress }: { retailerAddress: string }) => {
  const dispatch = useDispatch<AppDispatch>()

  const onSelectRetailer = () => {
    dispatch(setRetailerAddress(retailerAddress))
    dispatch(onHandleModalRetailer({ visible: false }))
  }

  return (
    <Button size="small" type="primary" onClick={onSelectRetailer} block>
      Select
    </Button>
  )
}

export default ColumnAction
