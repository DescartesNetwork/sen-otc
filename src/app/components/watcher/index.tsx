import { CSSProperties } from 'react'
import RetailerWatcher from './retailerWatcher'

const Watcher = ({
  children,
  style,
}: {
  children: JSX.Element
  style?: CSSProperties
}) => {
  return <RetailerWatcher style={style}>{children}</RetailerWatcher>
}

export default Watcher
