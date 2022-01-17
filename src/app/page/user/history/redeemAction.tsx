import { useDispatch } from 'react-redux'

import { Button } from 'antd'

import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'
import { AppDispatch } from 'app/model'

const {
  sol: { purchasing },
} = configs

const RedeemAction = ({ orderAddress }: { orderAddress: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const wallet = window.sentre.wallet

  const onRedeem = async () => {
    try {
      if (!wallet) return notifyError({ message: 'Wallet is not connected!' })
      const { txId } = await purchasing.redeemOrder(orderAddress, wallet)
      // dispatch(updateHistoryOTC({ orderAddress }))
      notifySuccess('Redeem', txId)
    } catch (er) {
      console.log(er)
      notifyError({ message: er })
    }
  }

  return (
    <Button size="small" type="primary" onClick={onRedeem} block>
      Redeem
    </Button>
  )
}

export default RedeemAction
