import { useState } from 'react'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const CancelAction = ({ onClick }: { onClick: () => void }) => {
  const [visible, setVisible] = useState(false)
  const onCancel = () => {
    onClick()
    setVisible(true)
  }
  return (
    <Row>
      <Col span={24}>
        <Button size="small" onClick={onCancel} block>
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
                <Button type="primary" onClick={() => {}}>
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
