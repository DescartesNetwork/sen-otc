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

export enum OrderState {
  Pending = 'pending',
  Approved = 'approved',
  Done = 'done',
  Rejected = 'rejected',
  Canceled = 'canceled',
  Unknown = 'unknown',
}

export const RETAILER_DATA_SIZE = 161
export const HISTORY_DATA_SIZE = 105
export const FILTER_RETAILER_DATA = [{ dataSize: RETAILER_DATA_SIZE }]
