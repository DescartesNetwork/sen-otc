import { Segmented } from 'antd'

export type BuySellFilterProps = {
  value: OtcMode
  onChange: (value: OtcMode) => void
}

const BuySellFilter = ({
  value = 'Buy',
  onChange = () => {},
}: BuySellFilterProps) => {
  return (
    <Segmented
      size="large"
      options={['Buy', 'Sell']}
      value={value}
      style={{ padding: 2 }}
      onChange={(e: any) => onChange(e as OtcMode)}
    />
  )
}

export default BuySellFilter
