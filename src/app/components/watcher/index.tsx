import { CSSProperties, Fragment } from 'react'
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
      <Fragment>
        {children}
        <OrderWatcher />
      </Fragment>
    </RetailerWatcher>
  )
}

export default Watcher
