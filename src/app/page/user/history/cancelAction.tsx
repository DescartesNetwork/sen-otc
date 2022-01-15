import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { notifyError } from 'app/helper'
import configs from 'app/configs'
import { AppDispatch } from 'app/model'
import { updateHistoryOTC } from 'app/model/history.controller'

const {
  sol: { purchasing },
} = configs

const CancelAction = ({ orderAddress }: { orderAddress: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [visible, setVisible] = useState(false)

  const wallet = window.sentre.wallet
  const onCancel = async () => {
    try {
      if (!wallet) return notifyError({ message: 'Wallet is not connected!' })
      await purchasing.cancelOrder(orderAddress, wallet)
      dispatch(updateHistoryOTC({ orderAddress }))
    } catch (er) {
      notifyError({ message: 'Locked time is not open' })
    } finally {
      setVisible(false)
    }
  }

  return (
    <Row>
      <Col span={24}>
        <Button size="small" onClick={() => setVisible(true)} block>
          Cancel
        </Button>
        <Modal
          visible={visible}
          onCancel={() => {}}
          footer={null}
          closable={false}
        >
          <Row gutter={[32, 32]} justify="end">
            <Col span={24}>
              <Space size={16} align="start">
                <Typography.Title level={4} style={{ color: '#FA8C16' }}>
                  <IonIcon name="alert-circle-outline" />
                </Typography.Title>
                <Space size={4} direction="vertical">
                  <Typography.Title level={5}>
                    Do you want to cancel this order?
                  </Typography.Title>
                  <Typography.Text>
                    You will still pay the network fee when you cancel the
                    order.
                  </Typography.Text>
                </Space>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button onClick={() => setVisible(false)}>No</Button>
                <Button type="primary" onClick={onCancel}>
                  Yes
                </Button>
              </Space>
            </Col>
          </Row>
        </Modal>
      </Col>
    </Row>
  )
}

export default CancelAction
