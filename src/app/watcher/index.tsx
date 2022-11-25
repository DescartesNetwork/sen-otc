import { Fragment } from 'react'

import OrderWatcher from './order.watcher'
import UIWatcher from './ui.watcher'
import WalletWatcher from './wallet.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <UIWatcher />
      <WalletWatcher />
      <OrderWatcher />
    </Fragment>
  )
}

export default Watcher
