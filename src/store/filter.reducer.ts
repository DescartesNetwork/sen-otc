import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export const SORTING_TYPES = ['Save', 'Price']
export enum SortedBy {
  AscendingSave = 'AscendingSave',
  DescendingSave = 'DescendingSave',
  AscendingPrice = 'AscendingPrice',
  DescendingPrice = 'DescendingPrice',
}
export enum OrderStatus {
  All = 'All',
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
  sort: SortedBy.AscendingSave,
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
