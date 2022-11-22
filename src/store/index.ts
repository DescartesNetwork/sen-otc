import { configureStore } from '@reduxjs/toolkit'
import { env } from 'configs/env'

import ui from './ui.reducer'
import filter from './filter.reducer'

/**
 * Root types
 */
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/**
 * Root store
 */
const store = configureStore({
  devTools: env === 'development' ? { name: 'kylan' } : false,
  reducer: {
    ui,
    filter,
  },
})

export default store
