import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export const SORTING_TYPES = ['Price', 'Recent']
export enum SortedBy {
  AscendingPrice = 'AscendingPrice',
  DescendingPrice = 'DescendingPrice',
  AscendingRecent = 'AscendingRecent',
  DescendingRecent = 'DescendingRecent',
}
export enum OrderStatus {
  All = 'All',
  Paused = 'Paused',
  Upcomming = 'Upcoming',
  Active = 'Active',
  Complete = 'Complete',
}

export type FilterState = {
  action: OtcMode
  paymentMethod: string
  partneredToken: string
  keyword: string
  sort: SortedBy
  status: OrderStatus
}

/**
 * Store constructor
 */

const NAME = 'filter'
const initialState: FilterState = {
  action: 'Buy',
  paymentMethod: 'USDC',
  partneredToken: 'All',
  keyword: '',
  sort: SortedBy.AscendingPrice,
  status: OrderStatus.Active,
}

/**
 * Actions
 */

export const updateFilter = createAsyncThunk(
  `${NAME}/updateFilter`,
  async (filter: Partial<FilterState>) => {
    return { ...filter }
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
      updateFilter.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
