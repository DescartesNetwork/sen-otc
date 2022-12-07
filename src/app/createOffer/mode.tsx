import { Space, Typography } from 'antd'
import BuySellFilter from 'components/filters/buySellFilter'

import { useAction } from 'providers/action.provider'

const Mode = () => {
  const { action, setAction } = useAction()

  return (
    <Space>
      <Typography.Title level={4}>🤔 I want to</Typography.Title>
      <BuySellFilter value={action} onChange={setAction} />
      <Typography.Title level={4}>tokens.</Typography.Title>
    </Space>
  )
}

export default Mode
