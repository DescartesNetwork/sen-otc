import { Typography } from 'antd'

import { useRetailerFee } from 'app/hooks/useRetailerFee'
import { numeric } from 'shared/util'

const ColumnRate = ({ retailerAddress }: { retailerAddress: string }) => {
  const { fee } = useRetailerFee(retailerAddress)

  return <Typography.Text>{numeric(fee).format('0,0.[00]%')}</Typography.Text>
}

export default ColumnRate
