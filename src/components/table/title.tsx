import { Typography } from 'antd'

export type TitleProps = {
  title: string
}
export const Title = ({ title }: TitleProps) => {
  return (
    <Typography.Text type="secondary" style={{ fontWeight: 300 }}>
      {title}
    </Typography.Text>
  )
}
