import { useMemo } from 'react'
import StatusTag from './statusTags'

export enum OrderStatus {
  Pending,
  Success,
  Reject,
}

const OrderHistoryStatus = ({ status }: { status: number }) => {
  const orderStatus = useMemo(() => {
    if (status === OrderStatus.Pending) return 'pending'
    if (status === OrderStatus.Success) return 'success'
    return 'reject'
  }, [status])

  return <StatusTag tag={orderStatus} />
}

export default OrderHistoryStatus
