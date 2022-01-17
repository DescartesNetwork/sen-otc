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
  ALL: 7,
}

export const ORDER_STATE_DIGIT = [
  'PENDING',
  'APPROVED',
  'DONE',
  'REJECTED',
  'CANCELED',
  'UNKNOWN',
  'ALL',
]

export enum OrderState {
  Pending = 'Pending',
  Approved = 'Approved',
  Done = 'Done',
  Rejected = 'Rejected',
  Canceled = 'Canceled',
  Unknown = 'Unknown',
  All = 'All',
}

export const RETAILER_DATA_SIZE = 161
export const HISTORY_DATA_SIZE = 105
export const FILTER_RETAILER_DATA = [{ dataSize: RETAILER_DATA_SIZE }]
