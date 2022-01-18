import { Fragment, useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import ConfirmOrder from '../page/retailer/orders/column/confrimOrder'
import IonIcon from 'shared/antd/ionicon'

import { ORDER_STATE_CODE } from 'app/constant'
import StatusTag from 'app/components/statusTags'

const ColumnStatus = ({
  state,
  orderData,
}: {
  state: number
  orderData: any
}) => {
  const [visible, setVisible] = useState(false)

  if (state === ORDER_STATE_CODE.PENDING)
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
          <ConfirmOrder setVisible={setVisible} orderData={orderData} />
        </Modal>
      </Fragment>
    )
  return <StatusTag state={state} />
}

export default ColumnStatus
