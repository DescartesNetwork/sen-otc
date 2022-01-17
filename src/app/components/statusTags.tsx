import { useMemo } from 'react'

import { Tag } from 'antd'
import { OrderState, ORDER_STATE_CODE } from 'app/constant'

const STATUS_COLOR: Record<OrderState, number[]> = {
  Approved: [10, 151, 155],
  Pending: [212, 177, 6],
  Rejected: [215, 35, 17],
  Done: [0, 0, 0],
  Canceled: [0, 0, 0],
  Unknown: [0, 0, 0],
  All: [],
}

const StatusTag = ({ state }: { state: number }) => {
  const statusText = useMemo(() => {
    switch (state) {
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
  }, [state])

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

export default StatusTag
