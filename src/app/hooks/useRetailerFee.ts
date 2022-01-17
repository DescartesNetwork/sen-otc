import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { DEFAULT_RETAILER_FEE } from 'app/constant'

export const useRetailerFee = (retailerAddress: string) => {
  const {
    retailers: { [retailerAddress]: retailerData },
  } = useSelector((state: AppState) => state)
  const [fee, setFee] = useState(0)

  const getFee = useCallback(() => {
    if (!retailerData) return setFee(0)
    setFee(DEFAULT_RETAILER_FEE)
  }, [retailerData])

  useEffect(() => {
    getFee()
  }, [getFee])

  return { fee }
}
