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

export enum OrderState {
  Open = 1,
  Approved = 2,
  Done = 3,
  Rejected = 4,
  Canceled = 5,
}

export const RETAILER_DATA_SIZE = 161
export const HISTORY_DATA_SIZE = 105
export const FILTER_RETAILER_DATA = [{ dataSize: RETAILER_DATA_SIZE }]
