import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type MainState = {
  orderStep: number
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  orderStep: 0,
}

/**
 * Actions
 */

export const setOrderStep = createAsyncThunk<MainState, number, { state: any }>(
  `${NAME}/increaseCounter`,
  async (step) => {
    return { orderStep: step }
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
      setOrderStep.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
