import ActionHistory from './actionHistory'
import OrderHistoryStatus from './orderHisotryStatus'

export const HISTORY_COLUMN = [
  {
    title: 'CREATED DAY',
    dataIndex: 'created_day',
    key: 'created_day',
  },
  {
    title: 'APPROVED DAY',
    dataIndex: 'approved_day',
    key: 'approved_day',
  },
  {
    title: 'ORDER ID',
    dataIndex: 'order_id',
    key: 'order_id',
  },
  {
    title: 'PRICE',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'STAUTS',
    dataIndex: 'state',
    key: 'state',
    render: (state: number) => <OrderHistoryStatus status={state} />,
  },
  {
    title: 'ACTIONS',
    key: 'state',
    dataIndex: 'state',
    width: 100,
    render: (state: number) => <ActionHistory state={state} />,
  },
]
export const demoData = [
  {
    created_day: '16 Nov, 2021 16:00',
    approved_day: '16 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 0,
  },
  {
    created_day: '16 Nov, 2021 16:00',
    approved_day: '16 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 1,
  },
  {
    created_day: '16 Nov, 2021 16:00',
    approved_day: '16 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 1,
  },
  {
    created_day: '16 Nov, 2021 16:00',
    approved_day: '16 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 2,
  },
]
