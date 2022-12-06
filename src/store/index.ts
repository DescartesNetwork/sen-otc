import { configureStore } from '@reduxjs/toolkit'

import { devTools, serializationMiddleware } from './devTools'

import ui from './ui.reducer'
import filter from './filter.reducer'
import wallet from './wallet.reducer'
import order from './order.reducer'
import newOrder from './newOrder.reducer'
import takeOrder from './takeOrder.reducer'
import transaction from './transaction.reducer'
import stat from './stat.reducer'

/**
 * Root types
 */
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/**
 * Root store
 */
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(serializationMiddleware),
  devTools: devTools('kylan'),
  reducer: {
    ui,
    filter,
    wallet,
    order,
    newOrder,
    takeOrder,
    transaction,
    stat,
  },
})

export default store
