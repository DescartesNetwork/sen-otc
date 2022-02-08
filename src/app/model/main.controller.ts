import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { OrderStep } from 'app/constant'

/**
 * Interface & Utility
 */

export type MainState = {
  orderStep: OrderStep
  retailerMode?: boolean
  visible?: boolean
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  orderStep: OrderStep.SelectToken,
  retailerMode: false,
  visible: false,
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

export const setRetailerMode = createAsyncThunk<
  Partial<MainState>,
  boolean,
  { state: any }
>(`${NAME}/setRetailerMode`, async (mode) => {
  return { retailerMode: mode }
})

export const onHandleModalRetailer = createAsyncThunk<
  Partial<MainState>,
  { visible: boolean },
  { state: any }
>(`${NAME}/onHandleModalRetailer`, async ({ visible }) => {
  return { visible: visible }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        setOrderStep.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setRetailerMode.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        onHandleModalRetailer.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
