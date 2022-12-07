import IconSax from '@sentre/antd-iconsax'
import { Select } from 'antd'

import { OrderStatus, useStatus } from 'providers/status.provider'

const StatusFilter = () => {
  const { status, setStatus } = useStatus()

  return (
    <Select
      size="large"
      style={{ minWidth: 96 }}
      suffixIcon={<IconSax name="ArrowDown2" />}
      options={Object.values(OrderStatus).map((value) => ({
        value,
        label: value,
      }))}
      value={status}
      onChange={setStatus}
    />
  )
}

export default StatusFilter
