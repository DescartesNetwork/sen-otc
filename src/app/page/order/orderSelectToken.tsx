import { Button, Col, Row, Select, Space, Typography } from 'antd'
import { OrderStep } from 'app/constant'
import { setOrderStep } from 'app/model/main.controller'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'

const SelectToken = ({
  value = 'Select',
  onChange = () => {},
}: {
  value?: string
  onChange?: (value: any) => void
}) => {
  return (
    <Select value={value} onChange={onChange}>
      <Select.Option key="Select">Select</Select.Option>
      {[1, 2, 3, 4].map((token, idx) => (
        <Select.Option key={`${token}_${idx}`}>Token {token}</Select.Option>
      ))}
    </Select>
  )
}

const FieldSelectToken = ({
  label = '',
  sub = '',
  subValue = '',
}: {
  label?: string
  sub?: string
  subValue?: number | string
}) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedToken, setSelectedToken] = useState('Select')

  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Typography.Text className="caption">{label}</Typography.Text>
      </Col>
      <Col span={24}>
        <NumericInput
          prefix={
            <SelectToken value={selectedToken} onChange={setSelectedToken} />
          }
          value={inputValue}
          onValue={setInputValue}
        />
      </Col>
      {subValue && (
        <Col>
          <Space size={4}>
            <Typography.Text type="secondary" className="caption">
              {sub}:
            </Typography.Text>
            <Typography.Text type="secondary" className="caption">
              {subValue}
            </Typography.Text>
          </Space>
        </Col>
      )}
    </Row>
  )
}

const OrderSelectToken = () => {
  const dispatch = useDispatch()
  const onFindRetailer = () => {
    dispatch(setOrderStep(OrderStep.FindRetailer))
  }
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <FieldSelectToken label="From" sub="Availabel" subValue="12 USDC" />
      </Col>
      <Col>
        <IonIcon name="swap-vertical-outline" />
      </Col>
      <Col span={24}>
        <FieldSelectToken
          label="From"
          sub="Market price"
          subValue="1 USD = 30 SNTR"
        />
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={onFindRetailer} block>
          Find retailer
        </Button>
      </Col>
    </Row>
  )
}
export default OrderSelectToken
