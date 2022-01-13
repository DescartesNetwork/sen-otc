import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Space, Typography } from 'antd'
import TokenSelect from 'app/components/selectTokens'
import NumericInput from 'shared/antd/numericInput'

import { useAskMints } from 'app/hooks/useAskTokens'
import { AppDispatch, AppState } from 'app/model'
import { setAskAmount, setAskMint } from 'app/model/order.controller'

const Ask = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { askAmount, askMintAddress },
  } = useSelector((state: AppState) => state)
  const { askMints } = useAskMints()

  const selectMintDefault = useCallback(() => {
    const defaultMint = askMints[0]
    if (!askMintAddress && defaultMint) dispatch(setAskMint(defaultMint))
  }, [askMintAddress, askMints, dispatch])

  useEffect(() => {
    selectMintDefault()
  }, [selectMintDefault])

  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Typography.Text className="caption">To</Typography.Text>
      </Col>
      <Col span={24}>
        <NumericInput
          size="large"
          prefix={
            <TokenSelect
              value={askMintAddress}
              tokens={askMints}
              onChange={(mintAddress) => dispatch(setAskMint(mintAddress))}
            />
          }
          value={askAmount}
          onValue={(amount) => dispatch(setAskAmount(amount))}
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

export default Ask
