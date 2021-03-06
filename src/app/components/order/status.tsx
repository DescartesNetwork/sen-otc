import { useMemo } from 'react'

import { Tag } from 'antd'
import { OrderState, ORDER_STATE_CODE } from 'app/constant/order'
import { useSelector } from 'react-redux'
import { AppState } from 'app/model'

const STATUS_COLOR: Record<OrderState, number[]> = {
  Approved: [12, 161, 191],
  Pending: [212, 177, 6],
  Rejected: [249, 87, 94],
  Done: [20, 224, 65],
  Canceled: [249, 87, 94],
  Unknown: [0, 0, 0],
}

const OrderStatus = ({ orderAddress }: { orderAddress: string }) => {
  const {
    orders: { [orderAddress]: orderData },
  } = useSelector((state: AppState) => state)

  const orderState = orderData.state
  const statusText = useMemo(() => {
    switch (orderState) {
      case ORDER_STATE_CODE.APPROVED:
        return OrderState.Approved
      case ORDER_STATE_CODE.REJECTED:
        return OrderState.Rejected
      case ORDER_STATE_CODE.CANCELED:
        return OrderState.Canceled
      case ORDER_STATE_CODE.DONE:
        return OrderState.Done
      case ORDER_STATE_CODE.PENDING:
        return OrderState.Pending
      default:
        return OrderState.Unknown
    }
  }, [orderState])

  const setTagColor = (opacity?: number) => {
    const color = STATUS_COLOR[statusText]
    if (opacity)
      return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`
  }

  return (
    <Tag
      style={{
        margin: 0,
        borderRadius: 4,
        color: setTagColor(),
        textTransform: 'capitalize',
      }}
      color={setTagColor(0.1)}
    >
      {statusText}
    </Tag>
  )
}

export default OrderStatus
