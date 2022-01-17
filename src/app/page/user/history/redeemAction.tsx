import { useState } from 'react'

import { Button } from 'antd'

import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'

const {
  sol: { purchasing },
} = configs

const RedeemAction = ({ orderAddress }: { orderAddress: string }) => {
  const [loading, setLoading] = useState(false)

  const onRedeem = async () => {
    try {
      setLoading(true)
      const wallet = window.sentre.wallet
      if (!wallet) return notifyError({ message: 'Wallet is not connected!' })
      const { txId } = await purchasing.redeemOrder(orderAddress, wallet)
      notifySuccess('Redeem', txId)
    } catch (er) {
      notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="small"
      type="primary"
      onClick={onRedeem}
      block
      loading={loading}
    >
      Redeem
    </Button>
  )
}

export default RedeemAction
