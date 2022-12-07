import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SegmentedValue } from 'antd/es/segmented'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, Row, Segmented, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'

import configs from 'configs'
import { useAsk } from 'providers/ask.provider'

const {
  otc: { partneredTokens },
} = configs
const METHOD = ['Amount', 'Price']
let timeoutId: ReturnType<typeof setTimeout>

const Ask = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [method, setMethod] = useState('Amount')
  const {
    askToken,
    setAskToken,
    askAmount,
    askAmountError,
    setAskAmount,
    resetAskAmount,
    askPrice,
    askPriceError,
    setAskPrice,
    resetAskPrice,
  } = useAsk()

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        if (method === 'Amount') {
          resetAskPrice()
          setAskAmount(e.target.value)
        } else {
          resetAskAmount()
          setAskPrice(e.target.value)
        }
      }, 500)
    },
    [setAskAmount, resetAskAmount, setAskPrice, resetAskPrice, method],
  )

  const onClear = useCallback(() => {
    setValue('')
    resetAskAmount()
    resetAskPrice()
  }, [resetAskAmount, resetAskPrice])

  const onSwitch = useCallback(
    (value: SegmentedValue) => {
      setMethod(value.toString())
      return onClear()
    },
    [onClear],
  )

  useEffect(() => {
    if (method === 'Amount') setValue(askAmount)
    else setValue(askPrice)
  }, [method, askAmount, askPrice])

  useEffect(() => {
    setAskToken('SNTR')
  })

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
        <Row gutter={[8, 8]} align="top" wrap={false}>
          <Col>
            <TokenSelection
              options={partneredTokens}
              value={askToken}
              onChange={setAskToken}
            />
          </Col>
          <Col flex="auto">
            <Row gutter={[0, 0]} justify="end">
              <Col span={24}>
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
                      disabled={!value}
                    />
                  }
                />
              </Col>
              {askAmountError && (
                <Col>
                  <Typography.Text type="danger">
                    {askAmountError}
                  </Typography.Text>
                </Col>
              )}
              {askPriceError && (
                <Col>
                  <Typography.Text type="danger">
                    {askPriceError}
                  </Typography.Text>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Ask
