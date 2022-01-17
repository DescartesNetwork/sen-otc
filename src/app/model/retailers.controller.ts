import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { account, RetailerData } from '@senswap/sen-js'

import configs from 'app/configs'
import { RETAILER_DATA_SIZE } from 'app/constant'

const {
  sol: { purchasing },
} = configs

/**
 * Interface & Utility
 */

export type RetailerState = Record<string, RetailerData>

/**
 * Store constructor
 */

const NAME = 'retailers'
const initialState: RetailerState = {}

/**
 * Actions
 */

export const getRetailers = createAsyncThunk<RetailerState>(
  `${NAME}/getRetailers`,
  async () => {
    // Get all farm
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await purchasing.connection.getProgramAccounts(
        purchasing.purchasingProgramId,
        {
          filters: [{ dataSize: RETAILER_DATA_SIZE }],
        },
      )

    let retailers: RetailerState = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = purchasing.parseRetailerData(buf)
      retailers[address] = data
    })
    return retailers
  },
)

export const getRetailer = createAsyncThunk<
  RetailerState,
  { address: string },
  { state: any }
>(`${NAME}/getRetailer`, async ({ address }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid retailer address')
  const {
    sol: { purchasing },
  } = configs
  const {
    retailers: { [address]: data },
  } = getState()
  if (data) return { [address]: data }
  const raw = await purchasing.getRetailerData(address)
  return { [address]: raw }
})

export const upsetRetailer = createAsyncThunk<
  RetailerState,
  { address: string; data: RetailerData }
>(`${NAME}/upsetRetailer`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid retailer address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteRetailer = createAsyncThunk(
  `${NAME}/deleteRetailer`,
  async ({ address }: { address: string }) => {
    if (!account.isAddress(address)) throw new Error('Invalid retailer address')
    return { address }
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
        getRetailers.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getRetailer.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetRetailer.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteRetailer.fulfilled,
        (state, { payload }) => void delete state[payload.address],
      ),
})

export default slice.reducer
