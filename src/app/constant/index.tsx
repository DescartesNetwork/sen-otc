export enum OrderStep {
  SelectToken,
  FindRetailer,
  Confirm,
}

export enum OrderState {
  Approved = 1,
  Rejected = 0,
  Pending = 2,
}

export const RETAILER_DATA_SIZE = 161
export const FILTER_RETAILER_DATA = [{ dataSize: RETAILER_DATA_SIZE }]
