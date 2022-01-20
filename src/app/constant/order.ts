export const ORDERS_DATA_SIZE = 105

export enum OrderState {
  Pending = 'Pending',
  Approved = 'Approved',
  Done = 'Done',
  Rejected = 'Rejected',
  Canceled = 'Canceled',
  Unknown = 'Unknown',
}

export const ORDER_STATE_CODE = {
  PENDING: 1,
  APPROVED: 2,
  DONE: 3,
  REJECTED: 4,
  CANCELED: 5,
  UNKNOWN: 6,
}
