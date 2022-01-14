import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { OrderData } from '@senswap/sen-js'

import configs from 'app/configs'
import { HISTORY_DATA_SIZE } from 'app/constant'

const {
  sol: { purchasing },
} = configs

/**
 * Interface & Utility
 */

export type HistoryState = Record<string, OrderData>

/**
 * Store constructor
 */

const NAME = 'history'
const initialState: HistoryState = {}

/**
 * Actions
 */

export const fetchHistoryOTC = createAsyncThunk<HistoryState>(
  `${NAME}/fetchHistoryOTC`,
  async () => {
    const owner = await window.sentre.wallet?.getAddress()
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await purchasing.connection.getProgramAccounts(
        purchasing.purchasingProgramId,
        {
          filters: [{ dataSize: HISTORY_DATA_SIZE }],
        },
      )
    let history: HistoryState = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = purchasing.parseOrderData(buf)
      if (data.owner !== owner) history[address] = data
    })
    return history
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
      fetchHistoryOTC.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
