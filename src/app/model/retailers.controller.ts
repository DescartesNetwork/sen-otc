import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AccountInfo, MemcmpFilter, PublicKey } from '@solana/web3.js'
import { account, RetailerData } from '@senswap/sen-js'

import configs from 'app/configs'
import { RETAILER_DATA_SIZE } from 'app/constant/retailer'
import TokenProvider from 'os/providers/tokenProvider'

const {
  sol: { purchasing },
} = configs

/**
 * Interface & Utility
 */

export type RetailersState = Record<string, RetailerData>

/**
 * Store constructor
 */

const NAME = 'retailers'
const initialState: RetailersState = {}

/**
 * Actions
 */

export const getRetailers = createAsyncThunk<
  RetailersState,
  { tokenProvider: TokenProvider; filter?: MemcmpFilter[] }
>(
  `${NAME}/getRetailers`,

  async ({ tokenProvider, filter = [] }) => {
    // Get all farm

    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await purchasing.connection.getProgramAccounts(
        purchasing.purchasingProgramId,
        {
          filters: [{ dataSize: RETAILER_DATA_SIZE }, ...filter],
        },
      )

    let retailers: RetailersState = {}
    for (const { pubkey, account: accountData } of value) {
      const address = pubkey.toBase58()
      const retailerData = purchasing.parseRetailerData(accountData.data)
      const { mint_bid, mint_ask } = retailerData
      // Filter single token
      const tokenBid = await tokenProvider.findByAddress(mint_bid)
      const tokenAsk = await tokenProvider.findByAddress(mint_ask)
      if (!tokenBid || !tokenAsk) continue
      retailers[address] = retailerData
    }

    return retailers
  },
)

export const getRetailer = createAsyncThunk<
  RetailersState,
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
  RetailersState,
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
      .addCase(getRetailers.fulfilled, (state, { payload }) => payload)
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
