import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { Button, Col, Input, Row, Segmented, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'

import configs from 'configs'
import { useAskAmount, useAskToken } from 'hooks/useNewOrder'
import IconSax from '@sentre/antd-iconsax'

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

  const onAskAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        return setAskAmount(e.target.value)
      }, 500)
    },
    [setAskAmount],
  )

  useEffect(() => {
    setValue(askAmount)
  }, [askAmount])

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
              onChange={(e) => setMethod(e.toString())}
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
              onChange={onAskAmount}
              suffix={
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<IconSax name="CloseCircle" />}
                  onClick={() => setAskAmount('')}
                  loading={loading}
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
