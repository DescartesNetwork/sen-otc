import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type WalletState = {
  address: string
  lamports: number
}

/**
 * Store constructor
 */

const NAME = 'wallet'
const initialState: WalletState = {
  address: '',
  lamports: 0,
}

/**
 * Actions
 */

export const updateWallet = createAsyncThunk(
  `${NAME}/updateWallet`,
  async (payload: Partial<WalletState>) => {
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
      updateWallet.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
