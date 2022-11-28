import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, Row, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'
import TokenBalance from 'components/tokenBalance'

import configs from 'configs'
import { useMetadataBySymbol } from 'hooks/useToken'
import { useBidAmount, useBidToken } from 'hooks/useNewOrder'

const {
  otc: { acceptedPayments },
} = configs
let timeoutId: ReturnType<typeof setTimeout>

const Bid = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const { bidToken, setBidToken } = useBidToken('USDC')
  const { bidAmount, error, setBidAmount, clear } = useBidAmount()
  const { address } = useMetadataBySymbol(bidToken) || {}

  const onBidAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        return setBidAmount(e.target.value)
      }, 500)
    },
    [setBidAmount],
  )

  const onClear = useCallback(() => {
    setValue('')
    clear()
  }, [clear])

  useEffect(() => {
    setValue(bidAmount)
  }, [bidAmount])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col flex="auto">
            <Typography.Text type="secondary">BID</Typography.Text>
          </Col>
          <Col>
            <TokenBalance mintAddress={address || ''} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} align="top" wrap={false}>
          <Col>
            <TokenSelection
              options={acceptedPayments}
              value={bidToken}
              onChange={setBidToken}
            />
          </Col>
          <Col flex="auto">
            <Row gutter={[0, 0]} justify="end">
              <Col span={24}>
                <Input
                  size="large"
                  placeholder={`Amount of ${bidToken}`}
                  value={value}
                  onChange={onBidAmount}
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
              {error && (
                <Col>
                  <Typography.Text type="danger">{error}</Typography.Text>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Bid
