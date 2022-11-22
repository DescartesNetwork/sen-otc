import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export enum OtcAction {
  Buy = 'Buy',
  Sell = 'Sell',
}

export enum SortedBySave {
  Increase,
  Decrease,
}

export enum SortedByPrice {
  Increase,
  Decrease,
}

export type SortedBy = SortedBySave | SortedByPrice

export type FilterState = {
  action: OtcAction
  paymentMethod: string
  offeredToken: string
  keyword: string
  sort: SortedBy
}

/**
 * Store constructor
 */

const NAME = 'filter'
const initialState: FilterState = {
  action: OtcAction.Buy,
  paymentMethod: 'USDC',
  offeredToken: 'USDC',
  keyword: '',
  sort: SortedBySave.Increase,
}

/**
 * Actions
 */

export const setAction = createAsyncThunk(
  `${NAME}/setAction`,
  async (action: OtcAction) => {
    return { action }
  },
)

export const setPaymentMethod = createAsyncThunk(
  `${NAME}/setPaymentMethod`,
  async (paymentMethod: string) => {
    return { paymentMethod }
  },
)

export const setOfferedToken = createAsyncThunk(
  `${NAME}/setOfferedToken`,
  async (offeredToken: string) => {
    return { offeredToken }
  },
)

export const setKeyword = createAsyncThunk(
  `${NAME}/setKeyword`,
  async (keyword: string) => {
    return { keyword }
  },
)

export const setSort = createAsyncThunk(
  `${NAME}/setSort`,
  async (sort: SortedBy) => {
    return { sort }
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
    void builder
      .addCase(
        setAction.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setPaymentMethod.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setKeyword.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setOfferedToken.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setSort.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
