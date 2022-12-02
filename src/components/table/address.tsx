import { Typography } from 'antd'
import { shortenAddress, explorer } from 'helpers/util'

export type AddressProps = {
  address: string
}

export const Address = ({ address }: AddressProps) => {
  return (
    <Typography.Link href={explorer(address)} target="_blank">
      {shortenAddress(address)}
    </Typography.Link>
  )
}
