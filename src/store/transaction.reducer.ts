import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ParsedTransactionWithMeta } from '@solana/web3.js'

/**
 * Interface & Utility
 */

export type TransactionState = Record<string, ParsedTransactionWithMeta>

/**
 * Store constructor
 */

const NAME = 'transaction'
const initialState: TransactionState = {}

/**
 * Actions
 */

export const updateTransaction = createAsyncThunk(
  `${NAME}/updateTransaction`,
  async (payload: TransactionState) => {
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
      updateTransaction.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
