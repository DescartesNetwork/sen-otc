import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import { notifyError } from 'app/helper'
import { AppDispatch, AppState } from 'app/model'
import {
  getUserOrders,
  getRetailerOrders,
  upsetOrder,
} from 'app/model/orders.controller'
import configs from 'app/configs'
import { Spin } from 'antd'

const {
  sol: { purchasing },
} = configs

// Watch id
let watchId = 0

const OrderWatcher = ({
  children,
  style = {},
}: {
  children: JSX.Element
  style?: CSSProperties
}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    main: { retailerMode },
    retailers,
  } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  // fetch user orders
  const fetchUserOrders = useCallback(
    () => dispatch(getUserOrders({ owner: walletAddress })).unwrap(),
    [dispatch, walletAddress],
  )

  // fetch user orders
  const fetchRetailerOrders = useCallback(async () => {
    const myRetailersAddr = Object.keys(retailers).filter(
      (addr) => retailers[addr].owner === walletAddress,
    )
    return dispatch(getRetailerOrders({ retailers: myRetailersAddr })).unwrap()
  }, [dispatch, retailers, walletAddress])

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      if (!account.isAddress(walletAddress)) return
      if (retailerMode) await fetchRetailerOrders()
      else await fetchUserOrders()
    } catch (er) {
      await notifyError(er)
    } finally {
      setLoading(false)
    }
  }, [fetchRetailerOrders, fetchUserOrders, retailerMode, walletAddress])

  // Watch account changes
  const watchData = useCallback(async () => {
    if (watchId) return console.warn('Already watched')
    const callback = (er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetOrder({ address, data }))
    }
    const filters = [{ dataSize: 105 }]
    watchId = purchasing.watch(callback, filters)
  }, [dispatch])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await purchasing.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return (
    <Spin spinning={loading} style={style}>
      {children}
    </Spin>
  )
}

export default OrderWatcher
