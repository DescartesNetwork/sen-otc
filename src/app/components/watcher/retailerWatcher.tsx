import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Spin } from 'antd'

import { notifyError } from 'app/helper'
import configs from 'app/configs'
import { getRetailers, upsetRetailer } from 'app/model/retailers.controller'
import { FILTER_RETAILER_DATA } from 'app/constant'

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
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      await dispatch(getRetailers())
    } catch (er) {
      await notifyError(er)
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const watchData = useCallback(async () => {
    if (watchId) return console.warn('Already watched')

    watchId = purchasing.watch((er, re: any) => {
      if (er) return console.error(er)
      const { type, address, data } = re
      if (type !== 'retailer') return

      return dispatch(upsetRetailer({ address, data }))
    }, FILTER_RETAILER_DATA)
  }, [dispatch])

  useEffect(() => {
    fetchData()
    watchData()
    return () => {
      ;(async () => {
        try {
          purchasing.unwatch(watchId)
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
