import { ChangeEvent, useCallback, useState } from 'react'
import { SegmentedValue } from 'antd/es/segmented'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, Row, Segmented, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'

import configs from 'configs'
import { useAskAmount, useAskPrice, useAskToken } from 'hooks/useNewOrder'

const {
  otc: { partneredTokens },
} = configs
const METHOD = ['Price', 'Amount']
let timeoutId: ReturnType<typeof setTimeout>

const Ask = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [method, setMethod] = useState('Price')
  const { askToken, setAskToken } = useAskToken('SNTR')
  const { askAmount, setAskAmount } = useAskAmount()
  const { askPrice, setAskPrice } = useAskPrice()

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        if (method === 'Price') {
          setAskAmount('')
          setAskPrice(e.target.value)
        } else {
          setAskPrice('')
          setAskAmount(e.target.value)
        }
      }, 500)
    },
    [setAskAmount, setAskPrice, method],
  )

  const onClear = useCallback(() => {
    setAskAmount('')
    setAskPrice('')
    return setValue('')
  }, [setAskAmount, setAskPrice])

  const onSwitch = useCallback(
    (value: SegmentedValue) => {
      setMethod(value.toString())
      return onClear()
    },
    [onClear],
  )

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false} align="bottom">
          <Col flex="auto">
            <Typography.Text type="secondary">ASK</Typography.Text>
          </Col>
          <Col>
            <Segmented
              size="small"
              options={METHOD.map((value) => ({
                label: (
                  <Typography.Text style={{ fontSize: 12 }}>
                    {`By ${value}`}
                  </Typography.Text>
                ),
                value,
              }))}
              value={method}
              onChange={onSwitch}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="middle">
          <Col>
            <TokenSelection
              options={partneredTokens}
              value={askToken}
              onChange={setAskToken}
            />
          </Col>
          <Col flex="auto">
            <Input
              size="large"
              placeholder={`${method} of ${askToken}`}
              value={value}
              onChange={onInput}
              suffix={
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<IconSax name="CloseCircle" />}
                  onClick={onClear}
                  loading={loading}
                  disabled={!askAmount && !askPrice}
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Ask
