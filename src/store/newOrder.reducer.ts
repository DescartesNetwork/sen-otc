import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type NewOrderState = {
  mode: OtcMode
  modeError: string
  bidToken: string
  bidAmount: string
  bidAmountError: string
  askToken: string
  askAmount: string
  askAmountError: string
  askPrice: string
  askPriceError: string
  startedAt: string
  startedAtError: string
  endedAt: string
  endedAtError: string
}

/**
 * Store constructor
 */

const NAME = 'newOrder'
const initialState: NewOrderState = {
  mode: 'Buy',
  modeError: '',
  bidToken: '',
  bidAmount: '',
  bidAmountError: '',
  askToken: '',
  askAmount: '',
  askAmountError: '',
  askPrice: '',
  askPriceError: '',
  startedAt: '',
  startedAtError: '',
  endedAt: '',
  endedAtError: '',
}

/**
 * Actions
 */

export const updateNewOrder = createAsyncThunk(
  `${NAME}/updateNewOrder`,
  async (payload: Partial<NewOrderState>) => {
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
      updateNewOrder.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
