import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { PublicKey } from '@solana/web3.js'
import { SenOtcEvents } from '@sentre/otc'

import { AppDispatch } from 'store'
import { OrderState, updateOrder } from 'store/order.reducer'
import { useOtc } from 'hooks/useProvider'

const EVENTS: Array<keyof SenOtcEvents> = [
  'MakeOrderEvent',
  'TakeOrderEvent',
  'PauseEvent',
  'ResumeEvent',
  'StopEvent',
]

const OrderWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const otc = useOtc()

  const fetchData = useCallback(async () => {
    const data = await otc.program.account.order.all()
    let orders: OrderState = {}
    data.forEach(
      ({ account, publicKey }) => (orders[publicKey.toBase58()] = account),
    )
    return dispatch(updateOrder(orders))
  }, [dispatch, otc])

  const refreshAnOrder = useCallback(
    async (order: PublicKey) => {
      const data = await otc.getOrderData(order.toBase58())
      return dispatch(updateOrder({ [order.toBase58()]: data }))
    },
    [dispatch, otc],
  )

  const watchData = useCallback(() => {
    const eventIds = EVENTS.map((event) =>
      otc.addListener(event, ({ order }) => refreshAnOrder(order)),
    )
    return () => eventIds.forEach((id) => otc.removeListener(id))
  }, [otc, refreshAnOrder])

  useEffect(() => {
    fetchData()
    const unwatch = watchData()
    return unwatch
  }, [fetchData, watchData])

  return null
}

export default OrderWatcher
