import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, Row, Typography } from 'antd'
import TokenSelection from 'components/tokenSelect'
import TokenBalance from 'components/tokenBalance'

import configs from 'configs'
import { useMetadataBySymbol } from 'hooks/useToken'
import { useBidAmount, useBidToken } from 'hooks/useNewOrder'

const {
  otc: { partneredTokens },
} = configs
let timeoutId: ReturnType<typeof setTimeout>

const Bid = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const { bidToken, setBidToken } = useBidToken('SNTR')
  const { bidAmount, setBidAmount } = useBidAmount()
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
    setBidAmount('')
  }, [setBidAmount])

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
        <Row gutter={[8, 8]} align="middle">
          <Col>
            <TokenSelection
              options={partneredTokens}
              value={bidToken}
              onChange={setBidToken}
            />
          </Col>
          <Col flex="auto">
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
                  disabled={!bidAmount}
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Bid
