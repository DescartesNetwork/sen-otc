import { Space, Typography } from 'antd'
import BuySellFilter from 'components/filters/buySellFilter'

import { useMode } from 'hooks/useNewOrder'

const Mode = () => {
  const { mode, setMode } = useMode()

  return (
    <Space>
      <Typography.Title level={4}>🤔 I want to</Typography.Title>
      <BuySellFilter value={mode} onChange={setMode} />
      <Typography.Title level={4}>tokens.</Typography.Title>
    </Space>
  )
}

export default Mode
