import { useMemo, useState } from 'react'

import { Tag } from 'antd'
import { OrderState } from 'app/constant'

const STATUS_COLOR: Record<string, number[]> = {
  approved: [10, 151, 155],
  pending: [212, 177, 6],
  reject: [215, 35, 17],
}

const StatusTag = ({ state }: { state: number }) => {
  const [text, setText] = useState('Unknown')

  const getColor = useMemo(() => {
    if (state === OrderState.Approved) {
      setText('Approved')
      return STATUS_COLOR['approved']
    }
    if (state === OrderState.Rejected) {
      setText('Rejected')
      return STATUS_COLOR['reject']
    }
    if (state === OrderState.Pending) {
      setText('Pending')
      return STATUS_COLOR['pending']
    }
    return [0, 0, 0]
  }, [state])

  const setTagColor = (opacity?: number) => {
    const color = getColor as number[]
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
      {text}
    </Tag>
  )
}

export default StatusTag
