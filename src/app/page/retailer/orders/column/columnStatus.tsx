import { Fragment, useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import ConfirmOrder from './confrimOrder'
import IonIcon from 'shared/antd/ionicon'

import OrderStatus from 'app/components/orderStatus'
import { OrderState } from 'app/constant'

const ColumnStatus = ({
  state,
  orderData,
}: {
  state: number
  orderData: any
}) => {
  const [visible, setVisible] = useState(false)
  if (state === OrderState.Open)
    return (
      <Fragment>
        <Button size="small" type="primary" onClick={() => setVisible(true)}>
          Confirm
        </Button>
        <Modal
          title={<Typography.Title level={4}>Confirm order</Typography.Title>}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          closeIcon={<IonIcon name="close" />}
        >
          <ConfirmOrder onClose={setVisible} orderData={orderData} />
        </Modal>
      </Fragment>
    )
  return <OrderStatus state={state} />
}

export default ColumnStatus
