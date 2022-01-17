import { useDispatch } from 'react-redux'

import { Button } from 'antd'

import configs from 'app/configs'
import { notifyError } from 'app/helper'
import { AppDispatch } from 'app/model'
import { updateHistoryOTC } from 'app/model/history.controller'

const {
  sol: { purchasing },
} = configs

const RedeemAction = ({ orderAddress }: { orderAddress: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const wallet = window.sentre.wallet
  const onRedeem = async () => {
    try {
      if (!wallet) return notifyError({ message: 'Wallet is not connected!' })
      await purchasing.redeemOrder(orderAddress, wallet)
      dispatch(updateHistoryOTC({ orderAddress }))
    } catch (er) {
      notifyError({ message: 'Locked time is not open' })
    }
  }
  return (
    <Button size="small" type="primary" onClick={onRedeem} block>
      Redeem
    </Button>
  )
}

export default RedeemAction
