import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { OrderStep } from 'app/constant'

/**
 * Interface & Utility
 */

export type MainState = {
  orderStep: OrderStep
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  orderStep: OrderStep.SelectToken,
}

/**
 * Actions
 */

export const setOrderStep = createAsyncThunk<
  Partial<MainState>,
  OrderStep,
  { state: any }
>(`${NAME}/increaseCounter`, async (step) => {
  return { orderStep: step }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      setOrderStep.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
