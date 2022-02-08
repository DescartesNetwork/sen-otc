import { Space, Typography } from 'antd'

const RowInfo = ({
  label = '',
  value = '',
}: {
  label?: string
  value?: string | number
}) => {
  return (
    <Space direction="vertical" size={4}>
      <Typography.Text type="secondary">{label}</Typography.Text>
      <Typography.Text>{value}</Typography.Text>
    </Space>
  )
}

export default RowInfo
