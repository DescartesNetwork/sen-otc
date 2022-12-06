import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type StatState = {
  tvl: number
  volume24h: number
}

/**
 * Store constructor
 */

const NAME = 'stat'
const initialState: StatState = {
  tvl: 0,
  volume24h: 0,
}

/**
 * Actions
 */

export const updateTvl = createAsyncThunk(
  `${NAME}/updateTvl`,
  async (tvl: number) => {
    return { tvl }
  },
)

export const updateVolume24h = createAsyncThunk(
  `${NAME}/updateVolume24h`,
  async (volume24h: number) => {
    return { volume24h }
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
        updateTvl.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        updateVolume24h.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
