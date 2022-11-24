import { Segmented } from 'antd'

export enum OtcAction {
  Buy = 'Buy',
  Sell = 'Sell',
}

export type BuySellFilterProps = {
  value: OtcAction
  onChange: (value: OtcAction) => void
}

const BuySellFilter = ({
  value = OtcAction.Buy,
  onChange = () => {},
}: BuySellFilterProps) => {
  return (
    <Segmented
      size="large"
      options={Object.values(OtcAction)}
      value={value}
      style={{ padding: 6 }}
      onChange={(e: any) => onChange(e)}
    />
  )
}

export default BuySellFilter
