import { useState } from 'react'

import { Button, Col, Modal, Radio, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import CoinFilterHistory from './filterHistory/coinFilterHistory'

import { OrderFilterOptions, ORDER_STATE_DIGIT } from 'app/constant'

const BodyContent = ({
  label,
  value,
  selected,
  onSelected,
}: {
  label: string
  value: string[] | number[]
  selected: any
  onSelected: (selected: any) => void
}) => {
  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col span={24}>
        <Radio.Group
          onChange={(e) => onSelected(e.target.value)}
          value={selected}
          className="filter-otc-radio-btn"
        >
          <Row gutter={[8, 8]}>
            {value.map((item, idx) => (
              <Col span={8} key={idx}>
                <Radio.Button value={item}>{item}</Radio.Button>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </Col>
    </Row>
  )
}

const ButtonFilterOrders = ({
  onSelect = () => {},
  orderFilter,
}: {
  onSelect: (value: OrderFilterOptions) => void
  orderFilter: OrderFilterOptions
}) => {
  const { time: propTime, status: PropStatus, coin: propCoin } = orderFilter
  const [visible, setVisible] = useState(false)
  const [coin, setCoin] = useState(propCoin)
  const [time, setTime] = useState(propTime)
  const [status, setStatus] = useState(PropStatus)

  const onApplyFilters = () => {
    onSelect({ coin, time, status })
  }

  return (
    <Space>
      <Button
        type="text"
        size="small"
        icon={<IonIcon name="funnel-outline" />}
        onClick={() => setVisible(true)}
      />
      <Modal
        footer={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
        closeIcon={<IonIcon name="close-outline" />}
        centered
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Title level={4}>Filter</Typography.Title>
          </Col>
          <Col span={24}>
            <CoinFilterHistory onSelect={setCoin} coin={coin} />
          </Col>
          <Col span={24}>
            <BodyContent
              label="Time"
              value={[7, 30, 90]}
              selected={time}
              onSelected={(val) => setTime(val)}
            />
          </Col>
          <Col span={24}>
            <BodyContent
              label="Status"
              value={ORDER_STATE_DIGIT}
              selected={status}
              onSelected={(val) => setStatus(val)}
            />
          </Col>
          <Col span={24}>
            <Button type="primary" onClick={onApplyFilters} block>
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal>
    </Space>
  )
}

export default ButtonFilterOrders
