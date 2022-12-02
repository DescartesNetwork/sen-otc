import { Typography } from 'antd'
import { numeric } from 'helpers/util'

import { useOfferedPrice } from 'hooks/useOrder'
import { usePrice } from 'hooks/useToken'

export type OfferedPriceProps = {
  orderAddress: string
}

export const OfferedPrice = ({ orderAddress }: OfferedPriceProps) => {
  const price = useOfferedPrice(orderAddress)
  return (
    <Typography.Text>{numeric(price).format('$0,0.[000000]')}</Typography.Text>
  )
}

export type ReferencePriceProps = {
  ticket: string
}

export const ReferencePrice = ({ ticket }: ReferencePriceProps) => {
  const { price } = usePrice(ticket)
  return (
    <Typography.Text>{numeric(price).format('$0,0.[000000]')}</Typography.Text>
  )
}
