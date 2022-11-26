import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type NewOrderState = {
  mode: OtcMode
  bidToken: string
  bidAmount: string
  askToken: string
  askAmount: string
  startedAt: string
  endedAt: string
}

/**
 * Store constructor
 */

const NAME = 'newOrder'
const initialState: NewOrderState = {
  mode: 'Buy',
  bidToken: '',
  bidAmount: '',
  askToken: '',
  askAmount: '',
  startedAt: '',
  endedAt: '',
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
