import { useState } from 'react'

import { Button, Col, Modal, Radio, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import FilterHistory from './filterHistory'
import { FilterOrderSet } from 'app/constant'

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
          size="small"
          className="filter-otc-radio-btn"
        >
          <Row gutter={[8, 8]}>
            {value.map((item, idx) => (
              <Col span={8} key={idx}>
                <Radio.Button value={idx}>{item}</Radio.Button>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </Col>
    </Row>
  )
}

const ButtonFilterOrders = () => {
  const [visible, setVisible] = useState(false)
  const [orderFilter, setOrderFilter] = useState<FilterOrderSet>({
    coin: 'All',
    time: 7,
    status: 'All',
  })

  return (
    <Space>
      <Button
        type="text"
        size="small"
        icon={<IonIcon name="filter-circle-outline" />}
        onClick={() => setVisible(true)}
      />
      <Modal
        footer={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
        closeIcon={<IonIcon name="close-outline" />}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Title level={4}>Filter</Typography.Title>
          </Col>
          <Col span={24}>
            <FilterHistory
              onSelect={setOrderFilter}
              filterValues={orderFilter}
            />
          </Col>
          <Col span={24}>
            <BodyContent
              label="Time"
              value={[7, 30, 90]}
              selected={orderFilter.time}
              onSelected={(val) =>
                setOrderFilter({ ...orderFilter, time: val })
              }
            />
          </Col>
          <Col span={24}>
            <BodyContent
              label="Status"
              value={[
                'All',
                'Pending',
                'Approved',
                'Done',
                'Canceled',
                'Reject',
              ]}
              selected={orderFilter.status}
              onSelected={(val) =>
                setOrderFilter({ ...orderFilter, status: val })
              }
            />
          </Col>
        </Row>
      </Modal>
    </Space>
  )
}

export default ButtonFilterOrders
