import { useCallback, useEffect } from 'react'

import { Col, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import TokenSelect from 'app/components/selectTokens'

import { useBidMints } from 'app/hooks/useBidTokens'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'app/model'
import { setBidAmount, setBidMint } from 'app/model/order.controller'

const Bid = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { bidAmount, bidMintAddress },
  } = useSelector((state: AppState) => state)
  const { bidMints } = useBidMints()

  const selectMintDefault = useCallback(() => {
    const defaultMint = bidMints[0]
    if (!bidMintAddress && defaultMint) dispatch(setBidMint(defaultMint))
  }, [bidMintAddress, bidMints, dispatch])

  useEffect(() => {
    selectMintDefault()
  }, [selectMintDefault])

  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Typography.Text className="caption">From</Typography.Text>
      </Col>
      <Col span={24}>
        <NumericInput
          size="large"
          prefix={
            <TokenSelect
              value={bidMintAddress}
              tokens={bidMints}
              onChange={(mintAddress) => dispatch(setBidMint(mintAddress))}
            />
          }
          value={bidAmount}
          onValue={(amount) => dispatch(setBidAmount(amount))}
        />
      </Col>
      <Col>
        <Space size={4}>
          <Typography.Text type="secondary" className="caption">
            Available:
          </Typography.Text>
          <Typography.Text type="secondary" className="caption">
            123
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Bid
