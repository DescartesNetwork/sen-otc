import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { OrderData } from '@sentre/otc'

/**
 * Interface & Utility
 */

export type OrderState = Record<string, OrderData>

/**
 * Store constructor
 */

const NAME = 'order'
const initialState: OrderState = {}

/**
 * Actions
 */

export const updateOrder = createAsyncThunk(
  `${NAME}/updateOrder`,
  async (payload: OrderState) => {
    return { ...payload }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      updateOrder.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
