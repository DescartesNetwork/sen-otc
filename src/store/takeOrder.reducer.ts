import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type TakeOrderState = {
  paidAmount: string
  paidAmountError: string
  receivedAmount: string
  receivedAmountError: string
}

/**
 * Store constructor
 */

const NAME = 'takeOrder'
const initialState: TakeOrderState = {
  paidAmount: '',
  paidAmountError: '',
  receivedAmount: '',
  receivedAmountError: '',
}

/**
 * Actions
 */

export const updateTakeOrder = createAsyncThunk(
  `${NAME}/updateTakeOrder`,
  async (payload: Partial<TakeOrderState>) => {
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
      updateTakeOrder.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
