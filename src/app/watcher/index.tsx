import { Fragment } from 'react'

import OrderWatcher from './order.watcher'
import UIWatcher from './ui.watcher'
import WalletWatcher from './wallet.watcher'
import TransactionWatcher from './transaction.watcher'
import StatWatcher from './stat.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <UIWatcher />
      <WalletWatcher />
      <OrderWatcher />
      <TransactionWatcher />
      <StatWatcher />
    </Fragment>
  )
}

export default Watcher
