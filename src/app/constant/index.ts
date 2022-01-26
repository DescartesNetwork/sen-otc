export enum OrderStep {
  SelectToken,
  FindRetailer,
  Confirm,
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

export enum UserOrderTabs {
  otc = 'order-otc',
  history = 'order-history',
}
export enum RetailerOrderTabs {
  about = 'about',
  orderList = 'order-list',
}

export const TIME_FRAME = [7, 30, 90]

export interface OrderFilterOptions {
  coin?: string
  time?: number
  status?: string
}
