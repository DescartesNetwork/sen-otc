import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, Row, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'
import TokenBalance from 'components/tokenBalance'

import configs from 'configs'
import { usePaidAmount, usePaidToken } from 'hooks/useTakeOrder'

const {
  otc: { partneredTokens },
} = configs
let timeoutId: ReturnType<typeof setTimeout>

const PaidAmount = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const paidToken = usePaidToken()
  const { paidAmount, setPaidAmount, clear, paidAmountError } = usePaidAmount()

  const onPaidAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        return setPaidAmount(e.target.value)
      }, 500)
    },
    [setPaidAmount],
  )

  const onMax = useCallback(
    (max: number) => {
      setPaidAmount(max.toString())
    },
    [setPaidAmount],
  )

  const onClear = useCallback(() => {
    setValue('')
    clear()
  }, [clear])

  useEffect(() => {
    setValue(paidAmount)
  }, [paidAmount])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col flex="auto">
            <Typography.Text type="secondary">PAY</Typography.Text>
          </Col>
          <Col>
            <TokenBalance
              mintAddress={paidToken?.address || ''}
              onMax={onMax}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="top" wrap={false}>
          <Col>
            <TokenSelection
              options={partneredTokens}
              value={paidToken?.symbol}
              disabled
            />
          </Col>
          <Col flex="auto">
            <Row gutter={[0, 0]} justify="end">
              <Col span={24}>
                <Input
                  size="large"
                  placeholder={`Amount of ${paidToken?.symbol}`}
                  value={value}
                  onChange={onPaidAmount}
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
              {paidAmountError && (
                <Col>
                  <Typography.Text type="danger">
                    {paidAmountError}
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

export default PaidAmount
