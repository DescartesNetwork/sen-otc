import StatusTag from 'app/components/statusTags'
import ActionHistory from './actionHistory'

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
    render: (state: number) => <StatusTag state={state} />,
  },
  {
    title: 'ACTIONS',
    key: 'action',
    dataIndex: 'action',
    width: 100,
    render: (action: number) => <ActionHistory state={action} />,
  },
]
export const demoData = [
  {
    created_day: '16 Nov, 2021 16:01',
    approved_day: '16 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 0,
    action: 0,
  },
  {
    created_day: '13 Nov, 2021 16:00',
    approved_day: '161 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 1,
    action: 2,
  },
  {
    created_day: '11 Nov, 2021 16:00',
    approved_day: '162 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 1,
    action: 1,
  },
  {
    created_day: '12 Nov, 2021 16:00',
    approved_day: '163 Nov, 2021 16:00',
    order_id: '0x12..aBs',
    price: '10 SEN - 395.93 SNTR',
    state: 2,
    action: 2,
  },
]
