import { CSSProperties } from 'react'
import OrderWatcher from './orderWatcher'
import RetailerWatcher from './retailerWatcher'

const Watcher = ({
  children,
  style,
}: {
  children: JSX.Element
  style?: CSSProperties
}) => {
  return (
    <RetailerWatcher style={style}>
      <OrderWatcher>{children}</OrderWatcher>
    </RetailerWatcher>
  )
}

export default Watcher
