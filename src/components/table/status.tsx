import { OrderStates } from '@sentre/otc'
import isEqual from 'react-fast-compare'

import {
  ActiveOfferTag,
  CompleteOfferTag,
  PausedOfferTag,
  UpcomingOfferTag,
} from 'components/offerTag'

import { useOrderSelector } from 'hooks/useOrder'

export type StatusProps = {
  orderAddress: string
}

export const Status = ({ orderAddress }: StatusProps) => {
  const { startDate, endDate, state } = useOrderSelector(
    (orders) => orders[orderAddress],
  )
  const current = Date.now()
  const start = startDate.toNumber() * 1000
  const end = endDate.toNumber() * 1000

  if (isEqual(state, OrderStates.Paused)) return <PausedOfferTag />
  if (start >= current) return <UpcomingOfferTag />
  if (end >= current) return <ActiveOfferTag />
  return <CompleteOfferTag />
}
