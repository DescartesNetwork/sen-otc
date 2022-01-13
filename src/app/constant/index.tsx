export enum OrderStep {
  SelectToken,
  FindRetailer,
  Confirm,
}

export enum OrderState {
  Uninitialized = 0,
  Open = 1,
  Approved = 2,
  Done = 3,
  Rejected = 4,
  Canceled = 5,
}

export const RETAILER_DATA_SIZE = 161
export const FILTER_RETAILER_DATA = [{ dataSize: RETAILER_DATA_SIZE }]
