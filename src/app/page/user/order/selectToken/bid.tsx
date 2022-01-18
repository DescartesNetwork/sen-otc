import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Divider, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import TokenSelect from 'app/components/selectTokens'

import { useBidMints } from 'app/hooks/useBidMints'
import { AppDispatch, AppState } from 'app/model'
import { setBidAmount, setBidMint } from 'app/model/order.controller'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { numeric } from 'shared/util'

const Bid = () => {
  const [selected, setSelected] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { bidAmount, bidMintAddress },
  } = useSelector((state: AppState) => state)
  const { bidMints } = useBidMints()
  const bidAccount = useAccountBalanceByMintAddress(bidMintAddress)

  const selectMintDefault = useCallback(() => {
    const defaultMint = bidMints[0]
    if (!selected && defaultMint) dispatch(setBidMint(defaultMint))
  }, [bidMints, dispatch, selected])

  useEffect(() => {
    selectMintDefault()
  }, [selectMintDefault])

  const onSelectToken = (mintAddress: string) => {
    setSelected(true)
    dispatch(setBidMint(mintAddress))
  }

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
              onChange={onSelectToken}
              className="otc-selection"
              bordered={false}
              suffixIcon={<Divider type="vertical" />}
              dropdownStyle={{ minWidth: 170 }}
            />
          }
          value={bidAmount}
          onValue={(amount: string) => dispatch(setBidAmount(amount))}
        />
      </Col>
      <Col>
        <Space size={4}>
          <Typography.Text type="secondary" className="caption">
            Available:
          </Typography.Text>
          <Typography.Text type="secondary" className="caption">
            {numeric(bidAccount.balance).format('0,0.[00]')}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Bid
