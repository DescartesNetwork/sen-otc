import { Fragment, useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import ConfirmOrder from './confrimOrder'
import IonIcon from 'shared/antd/ionicon'

import { ORDER_STATE_CODE } from 'app/constant/order'
import OrderStatus from 'app/components/order/status'
import { useSelector } from 'react-redux'
import { AppState } from 'app/model'

const RetailerAction = ({ orderAddress }: { orderAddress: string }) => {
  const {
    orders: { [orderAddress]: orderData },
  } = useSelector((state: AppState) => state)
  const [visible, setVisible] = useState(false)

  if (orderData.state !== ORDER_STATE_CODE.PENDING)
    return <OrderStatus orderAddress={orderAddress} />

  return (
    <Fragment>
      <Button size="small" type="primary" onClick={() => setVisible(true)}>
        Approve
      </Button>
      <Modal
        title={<Typography.Title level={4}>Confirm order</Typography.Title>}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close" />}
      >
        <ConfirmOrder setVisible={setVisible} orderAddress={orderAddress} />
      </Modal>
    </Fragment>
  )
}

export default RetailerAction
