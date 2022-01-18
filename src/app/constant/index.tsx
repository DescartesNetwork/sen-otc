export enum OrderStep {
  SelectToken,
  FindRetailer,
  Confirm,
}
export enum TierLevel {
  Brozen,
  Silver,
  Gold,
  Platinum,
}

export const ORDER_STATE_CODE = {
  PENDING: 1,
  APPROVED: 2,
  DONE: 3,
  REJECTED: 4,
  CANCELED: 5,
  UNKNOWN: 6,
}

export const ORDER_STATE_DIGIT = [
  'ALL',
  'PENDING',
  'APPROVED',
  'DONE',
  'REJECTED',
  'CANCELED',
]

export const ALL = 'ALL'

export enum OrderState {
  Pending = 'Pending',
  Approved = 'Approved',
  Done = 'Done',
  Rejected = 'Rejected',
  Canceled = 'Canceled',
  Unknown = 'Unknown',
}

export enum UserOrderTabs {
  otc = 'order-otc',
  history = 'order-history',
}
export enum RetailerOrderTabs {
  about = 'about',
  orderList = 'order-list',
}
export const RETAILER_DATA_SIZE = 161
export const HISTORY_DATA_SIZE = 105
export const FILTER_RETAILER_DATA = [{ dataSize: RETAILER_DATA_SIZE }]

export const DEFAULT_RETAILER_FEE = 0.005

export const TIME_FRAME = [7, 30, 90]

export interface FilterOrderSet {
  coin?: string
  time?: number
  status?: string
}
