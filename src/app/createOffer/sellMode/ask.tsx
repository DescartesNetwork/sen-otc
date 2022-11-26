import { ChangeEvent, useCallback, useState } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, Row, Segmented, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'

import configs from 'configs'
import { useAskAmount, useAskToken } from 'hooks/useNewOrder'

const {
  otc: { acceptedPayments },
} = configs
let timeoutId: ReturnType<typeof setTimeout>

const Ask = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const { askToken, setAskToken } = useAskToken('USDC')
  const { askAmount, setAskAmount } = useAskAmount()

  const onAskAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        setAskAmount(e.target.value)
      }, 500)
    },
    [setAskAmount],
  )

  const onClear = useCallback(() => {
    setAskAmount('')
    return setValue('')
  }, [setAskAmount])

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
              options={[
                {
                  label: (
                    <Typography.Text style={{ fontSize: 12 }}>
                      By Amount
                    </Typography.Text>
                  ),
                  value: 'Amount',
                },
                {
                  label: (
                    <Typography.Text style={{ fontSize: 12 }} type="secondary">
                      By Price
                    </Typography.Text>
                  ),
                  value: 'Price',
                },
              ]}
              value={'Amount'}
              disabled
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="middle">
          <Col>
            <TokenSelection
              options={acceptedPayments}
              value={askToken}
              onChange={setAskToken}
            />
          </Col>
          <Col flex="auto">
            <Input
              size="large"
              placeholder={`Amount of ${askToken}`}
              value={value}
              onChange={onAskAmount}
              suffix={
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<IconSax name="CloseCircle" />}
                  onClick={onClear}
                  loading={loading}
                  disabled={!askAmount}
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
