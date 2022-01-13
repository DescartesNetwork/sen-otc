import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { RetailerState } from 'app/model/retailers.controller'

export const useFoundRetailer = () => {
  const {
    retailers,
    order: { bidMintAddress, askMintAddress },
  } = useSelector((state: AppState) => state)
  const [foundRetailer, setFoundRetailer] = useState<RetailerState>({})

  const findRetailer = useCallback(() => {
    const newFoundRetailer: RetailerState = {}
    for (const addr in retailers) {
      const retailerData = retailers[addr]
      if (
        retailerData.mint_bid === bidMintAddress &&
        retailerData.mint_ask === askMintAddress
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
