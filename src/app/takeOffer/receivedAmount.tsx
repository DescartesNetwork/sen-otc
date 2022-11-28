import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, Row, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'
import TreasuryBalance from 'components/treasuryBalance'

import configs from 'configs'
import { useReceivedAmount, useReceivedToken } from 'hooks/useTakeOrder'
import { useRouteParam } from 'hooks/useQueryParam'

const {
  otc: { acceptedPayments },
} = configs
let timeoutId: ReturnType<typeof setTimeout>

const ReceivedAmount = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const orderAddress = useRouteParam('orderAddress') || ''
  const { receivedAmount, setReceivedAmount, receivedAmountError, clear } =
    useReceivedAmount()
  const receivedToken = useReceivedToken()

  const onAskAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        setReceivedAmount(e.target.value)
      }, 500)
    },
    [setReceivedAmount],
  )

  const onClear = useCallback(() => {
    setValue('')
    clear()
  }, [clear])

  useEffect(() => {
    setValue(receivedAmount)
  }, [receivedAmount])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false} align="bottom">
          <Col flex="auto">
            <Typography.Text type="secondary">RECEIVE</Typography.Text>
          </Col>
          <Col>
            <TreasuryBalance type="b" orderAddress={orderAddress} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="top" wrap={false}>
          <Col>
            <TokenSelection
              options={acceptedPayments}
              value={receivedToken?.symbol}
              disabled
            />
          </Col>
          <Col flex="auto">
            <Row gutter={[0, 0]} justify="end">
              <Col span={24}>
                <Input
                  size="large"
                  placeholder={`Amount of ${receivedToken?.symbol}`}
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
                      disabled={!value}
                    />
                  }
                />
              </Col>
              {receivedAmountError && (
                <Col>
                  <Typography.Text type="danger">
                    {receivedAmountError}
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

export default ReceivedAmount
