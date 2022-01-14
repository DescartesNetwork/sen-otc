import { useMemo } from 'react'

import { Tag } from 'antd'
import { OrderState } from 'app/constant'

const STATUS_COLOR: Record<string, number[]> = {
  approved: [10, 151, 155],
  open: [212, 177, 6],
  reject: [215, 35, 17],
  done: [0, 0, 0],
  cancel: [0, 0, 0],
}

const StatusTag = ({ state }: { state: number }) => {
  const statusText = useMemo(() => {
    if (state === OrderState.Approved) return 'approved'

    if (state === OrderState.Rejected) return 'reject'

    if (state === OrderState.Canceled) return 'cancel'

    if (state === OrderState.Done) return 'done'

    if (state === OrderState.Open) return 'open'

    return 'unknown'
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
