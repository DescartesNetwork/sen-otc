import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ParsedTransactionWithMeta } from '@solana/web3.js'

/**
 * Interface & Utility
 */

export type HistoryState = Record<string, ParsedTransactionWithMeta>

/**
 * Store constructor
 */

const NAME = 'history'
const initialState: HistoryState = {}

/**
 * Actions
 */

export const updateHistory = createAsyncThunk(
  `${NAME}/updateHistory`,
  async (payload: HistoryState) => {
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
      updateHistory.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
