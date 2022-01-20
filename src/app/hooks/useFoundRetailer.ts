import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { RetailersState } from 'app/model/retailers.controller'
import { RetailerState } from 'app/constant/retailer'

export const useFoundRetailer = () => {
  const {
    retailers,
    order: { bidMintAddress, askMintAddress },
  } = useSelector((state: AppState) => state)
  const [foundRetailer, setFoundRetailer] = useState<RetailersState>({})

  const findRetailer = useCallback(() => {
    const newFoundRetailer: RetailersState = {}
    for (const addr in retailers) {
      const retailerData = retailers[addr]
      if (
        retailerData.mint_bid === bidMintAddress &&
        retailerData.mint_ask === askMintAddress &&
        retailerData.state === RetailerState.Active
      )
        newFoundRetailer[addr] = retailerData
    }
    return setFoundRetailer(newFoundRetailer)
  }, [askMintAddress, bidMintAddress, retailers])

  useEffect(() => {
    findRetailer()
  }, [findRetailer])

  return { foundRetailer }
}
