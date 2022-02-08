import { useDispatch, useSelector } from 'react-redux'

import { Col, Modal, Row } from 'antd'

import { numeric } from 'shared/util'
import IonIcon from 'shared/antd/ionicon'
import MintInfo from './mintInfo'
import OrderInfo from './orderInfo'

import { AppDispatch, AppState } from 'app/model'
import FindRetailerNew from '../findRetailerNew'
import { onHandleModalRetailer } from 'app/model/main.controller'
import Action from './action'

const OrderDetails = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { bidMintAddress, askMintAddress, bidAmount, askAmount },
    main: { visible },
  } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <MintInfo
              mintAddress={bidMintAddress}
              value={`${numeric(bidAmount).format('0,0.[0000]')} LP`}
            />
          </Col>
          <Col>
            <IonIcon name="arrow-forward-outline" />
          </Col>
          <Col>
            <MintInfo
              mintAddress={askMintAddress}
              value={numeric(askAmount).format('0,0.[0000]')}
              floatRight
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <OrderInfo />
      </Col>
      <Col span={24}>
        <Action />
      </Col>
      <Modal
        visible={visible}
        onCancel={() => dispatch(onHandleModalRetailer({ visible: false }))}
        centered
        footer={false}
        closable={false}
      >
        <FindRetailerNew />
      </Modal>
    </Row>
  )
}
export default OrderDetails
