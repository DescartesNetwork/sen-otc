import { AccountInfo, PublicKey } from '@solana/web3.js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account, OrderData } from '@senswap/sen-js'

import configs from 'app/configs'
import { RetailersState } from './retailers.controller'
import { getWalletAddress } from 'app/helper'
import TokenProvider from 'os/providers/tokenProvider'

const {
  sol: { purchasing },
} = configs
/**
 * Store constructor
 */

export type OrdersState = Record<string, OrderData>

const NAME = 'orders'
const initialState: OrdersState = {}

/**
 * Actions
 */
const visibleOrder = async (
  orderData: OrderData,
  retailers: RetailersState,
  tokenProvider: TokenProvider,
) => {
  const retailerData = retailers[orderData.retailer]
  if (!retailerData) return false
  const { mint_bid, mint_ask } = retailerData
  const tokenBid = await tokenProvider.findByAddress(mint_bid)
  const tokenAsk = await tokenProvider.findByAddress(mint_ask)
  if (!tokenBid || !tokenAsk) return false
  return true
}

export const getUserOrders = createAsyncThunk(
  `${NAME}/getUserOrders`,
  async ({
    owner,
    retailers,
    tokenProvider,
  }: {
    owner: string
    retailers: RetailersState
    tokenProvider: TokenProvider
  }) => {
    // Fetch all orders with specific owner
    let opts = []
    opts.push({ memcmp: { bytes: owner, offset: 0 } })
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await purchasing.connection.getProgramAccounts(
        purchasing.purchasingProgramId,
        {
          filters: [{ dataSize: 105 }, ...opts],
        },
      )
    // Parser + filter order data
    const bulk: OrdersState = {}
    for (const { pubkey, account: accountData } of value) {
      const address = pubkey.toBase58()
      const orderData = purchasing.parseOrderData(accountData.data)
      const visible = await visibleOrder(orderData, retailers, tokenProvider)
      if (visible) bulk[address] = orderData
    }

    return bulk
  },
)

export const getRetailerOrders = createAsyncThunk(
  `${NAME}/getRetailerOrders`,
  async ({
    retailers,
    tokenProvider,
  }: {
    retailers: RetailersState
    tokenProvider: TokenProvider
  }) => {
    const {
      sol: { purchasing },
    } = configs
    // Get owner retailer
    const walletAddress = await getWalletAddress()
    const myRetailerAddresses = Object.keys(retailers).filter(
      (addr) => retailers[addr].owner === walletAddress,
    )
    // Get all orders with list retailers
    let bulk: OrdersState = {}
    await Promise.all(
      myRetailerAddresses.map(async (retailerAddr) => {
        let opts = [{ memcmp: { bytes: retailerAddr, offset: 33 } }]
        const value: Array<{
          pubkey: PublicKey
          account: AccountInfo<Buffer>
        }> = await purchasing.connection.getProgramAccounts(
          purchasing.purchasingProgramId,
          {
            filters: [{ dataSize: 105 }, ...opts],
          },
        )
        // Parser + filter order data
        for (const { pubkey, account: accountData } of value) {
          const address = pubkey.toBase58()
          const orderData = purchasing.parseOrderData(accountData.data)
          const visible = await visibleOrder(
            orderData,
            retailers,
            tokenProvider,
          )
          if (visible) bulk[address] = orderData
        }
      }),
    )
    return bulk
  },
)

export const getOrder = createAsyncThunk<
  OrdersState,
  { address: string },
  { state: any }
>(`${NAME}/getOrder`, async ({ address }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid order address')
  const {
    sol: { purchasing },
  } = configs
  const {
    retailers: { [address]: data },
  } = getState()
  if (data) return { [address]: data }
  const raw = await purchasing.getOrderData(address)
  return { [address]: raw }
})

export const upsetOrder = createAsyncThunk<
  OrdersState,
  { address: string; data: OrderData },
  { state: any }
>(`${NAME}/upsetOrder`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid order address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteOrder = createAsyncThunk(
  `${NAME}/deleteOrder`,
  async ({ address }: { address: string }) => {
    if (!account.isAddress(address)) throw new Error('Invalid order address')
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
      .addCase(getUserOrders.fulfilled, (state, { payload }) => payload)
      .addCase(getRetailerOrders.fulfilled, (state, { payload }) => payload)
      .addCase(
        getOrder.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetOrder.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteOrder.fulfilled,
        (state, { payload }) => void delete state[payload.address],
      ),
})

export default slice.reducer
