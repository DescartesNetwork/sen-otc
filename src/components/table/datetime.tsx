import dayjs from 'dayjs'

import { Typography } from 'antd'

export type DatetimeProps = {
  timestamp: number
}

export const Datetime = ({ timestamp }: DatetimeProps) => {
  return (
    <Typography.Text type="secondary">
      {dayjs(timestamp).format('HH:mm, DD MMM YYYY')}
    </Typography.Text>
  )
}
