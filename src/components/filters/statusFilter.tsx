import { CSSProperties } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Select } from 'antd'

import { OrderStatus } from 'providers/status.provider'

export type StatusFilterProps = {
  value?: OrderStatus
  onChange?: (value: OrderStatus) => void
  style?: CSSProperties
}

const StatusFilter = ({
  value = OrderStatus.All,
  onChange = () => {},
  style = {},
}: StatusFilterProps) => {
  return (
    <Select
      size="large"
      style={{ minWidth: 96, ...style }}
      suffixIcon={<IconSax name="ArrowDown2" />}
      options={Object.values(OrderStatus).map((value) => ({
        value,
        label: value,
      }))}
      value={value}
      onChange={onChange}
    />
  )
}

export default StatusFilter
