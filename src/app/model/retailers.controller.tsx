import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { RetailerData } from '@senswap/sen-js'

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

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      getRetailers.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
