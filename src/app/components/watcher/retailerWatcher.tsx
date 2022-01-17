import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import { Spin } from 'antd'

import { notifyError } from 'app/helper'
import { AppDispatch } from 'app/model'
import { getRetailers, upsetRetailer } from 'app/model/retailers.controller'
import configs from 'app/configs'

const {
  sol: { purchasing },
} = configs

// Watch id
let watchId = 0

const RetailerWatcher = ({
  children,
  style = {},
}: {
  children: JSX.Element
  style?: CSSProperties
}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      if (!account.isAddress(walletAddress)) return
      await dispatch(getRetailers()).unwrap()
    } catch (er) {
      await notifyError(er)
    } finally {
      setLoading(false)
    }
  }, [dispatch, walletAddress])

  // Watch account changes
  const watchData = useCallback(async () => {
    if (watchId) return console.warn('Already watched')
    const callback = (er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetRetailer({ address, data }))
    }
    const filters = [{ dataSize: 161 }]
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

export default RetailerWatcher
