import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type OrderState = {
  bidMintAddress: string
  bidAmount: number
  askMintAddress: string
  askAmount: number
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: OrderState = {
  bidMintAddress: '',
  bidAmount: 0,
  askMintAddress: '',
  askAmount: 0,
}

/**
 * Actions
 */

export const setBidMint = createAsyncThunk<Partial<OrderState>, string>(
  `${NAME}/setBidMint`,
  async (bidMintAddress) => {
    return { bidMintAddress }
  },
)

export const setBidAmount = createAsyncThunk<Partial<OrderState>, number>(
  `${NAME}/setBidAmount`,
  async (bidAmount) => {
    return { bidAmount }
  },
)

export const setAskMint = createAsyncThunk<Partial<OrderState>, string>(
  `${NAME}/setAskMint`,
  async (askMintAddress) => {
    return { askMintAddress }
  },
)

export const setAskAmount = createAsyncThunk<Partial<OrderState>, number>(
  `${NAME}/setAskAmount`,
  async (askAmount) => {
    return { askAmount }
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
        setBidMint.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setBidAmount.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setAskMint.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setAskAmount.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
