import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Divider, Row, Typography } from 'antd'
import TokenSelect from 'app/components/selectTokens'
import NumericInput from 'shared/antd/numericInput'
import MarketPrice from './marketPrice'

import { useAskMints } from 'app/hooks/useAskMints'
import { AppDispatch, AppState } from 'app/model'
import { setAskAmount, setAskMint } from 'app/model/order.controller'
import { useMarketPrice } from 'app/hooks/useMarketPrice'
import { DEFAULT_RETAILER_FEE } from 'app/constant/retailer'

const Ask = () => {
  const [selected, setSelected] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { askAmount, askMintAddress, bidAmount, bidMintAddress },
  } = useSelector((state: AppState) => state)
  const { askMints } = useAskMints()
  const { marketPrice } = useMarketPrice(bidMintAddress, askMintAddress)

  const selectMintDefault = useCallback(() => {
    const defaultMint = askMints[0]
    if (!selected && defaultMint) dispatch(setAskMint(defaultMint))
  }, [askMints, dispatch, selected])

  useEffect(() => {
    selectMintDefault()
  }, [selectMintDefault])

  const autoFillAsk = useCallback(() => {
    let askEstimate =
      marketPrice * Number(bidAmount) * (1 - DEFAULT_RETAILER_FEE)
    dispatch(setAskAmount(String(askEstimate)))
  }, [bidAmount, dispatch, marketPrice])

  useEffect(() => {
    autoFillAsk()
  }, [autoFillAsk])

  const onSelectToken = (mintAddress: string) => {
    setSelected(true)
    dispatch(setAskMint(mintAddress))
  }

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
              onChange={onSelectToken}
              className="otc-selection"
              bordered={false}
              suffixIcon={<Divider type="vertical" />}
              dropdownStyle={{ minWidth: 170 }}
            />
          }
          value={askAmount}
          onValue={(amount) => dispatch(setAskAmount(amount))}
        />
      </Col>
      <Col span={24}>
        <MarketPrice />
      </Col>
    </Row>
  )
}

export default Ask
