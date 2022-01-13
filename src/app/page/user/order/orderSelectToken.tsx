import { Button, Col, Divider, Row, Select, Space, Typography } from 'antd'
import { OrderStep } from 'app/constant'
import { setOrderStep } from 'app/model/main.controller'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintName } from 'shared/antd/mint'
import NumericInput from 'shared/antd/numericInput'

const SelectToken = ({
  value = 'Select',
  onChange = () => {},
}: {
  value?: string
  onChange?: (value: any) => void
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      bordered={false}
      suffixIcon={<Divider type="vertical" />}
      dropdownStyle={{ minWidth: 140 }}
    >
      <Select.Option key="Select">
        <Space>
          <MintAvatar
            mintAddress="Select"
            icon={<IonIcon name="help-outline" />}
          />
          <Typography.Text>Select</Typography.Text>
        </Space>
      </Select.Option>
      {[1, 2, 3, 4].map((token, idx) => (
        <Select.Option key={`${token}_${idx}`}>
          <Space>
            <MintAvatar mintAddress="2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj" />
            <MintName mintAddress="2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj" />
          </Space>
        </Select.Option>
      ))}
    </Select>
  )
}

const FieldSelectToken = ({
  label = '',
  subLabel = '',
  subValue = '',
}: {
  label?: string
  subLabel?: string
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
          size="large"
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
              {subLabel}:
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
    <Row gutter={[24, 24]} justify="center">
      <Col span={24}>
        <FieldSelectToken
          label="From"
          subLabel="Availabel"
          subValue="12 USDC"
        />
      </Col>
      <Col>
        <IonIcon name="swap-vertical-outline" />
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <FieldSelectToken label="To" />
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">
              Market price: 1 USDC = 39.55 SNTR
            </Typography.Text>
          </Col>
        </Row>
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
