/// <reference types="react-scripts" />

type OtcMode = 'Buy' | 'Sell'

type TokenMetadata = {
  address: string
  symbol: string
  cgkTicket: string
  decimals: number
  url: string
}

type SplTokenTransferTransaction = {
  amount: string
  authority: string
  source: string
  destination: string
}
