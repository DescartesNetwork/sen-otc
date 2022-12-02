import { Typography } from 'antd'

export type OfferTagProps = {
  title?: string
  color?: string
}

export const OfferTag = ({ title, color }: OfferTagProps) => {
  return (
    <Typography.Text
      style={{
        backgroundColor: `${color}15`,
        color: color,
        padding: '4px 8px',
        borderRadius: 12,
      }}
    >
      {title}
    </Typography.Text>
  )
}

export const ActiveOfferTag = () => {
  return <OfferTag title="Active" color="#1A63FF" />
}

export const UpcomingOfferTag = () => {
  return <OfferTag title="Upcoming" color="#B8A500" />
}

export const CompleteOfferTag = () => {
  return <OfferTag title="Complete" color="#52C41A" />
}
