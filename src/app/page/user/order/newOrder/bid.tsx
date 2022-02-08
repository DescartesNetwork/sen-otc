import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Typography } from 'antd'
import TokenSelect from 'app/components/selectTokensNew'

import { useBidMints } from 'app/hooks/useBidMints'
import { AppDispatch, AppState } from 'app/model'
import { setBidMint } from 'app/model/order.controller'

const Bid = () => {
  const [selected, setSelected] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { bidMintAddress },
  } = useSelector((state: AppState) => state)
  const { bidMints } = useBidMints()

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
        <TokenSelect
          value={bidMintAddress}
          tokens={bidMints}
          onChange={onSelectToken}
          className="otc-selections"
          size="large"
          dropdownStyle={{ minWidth: 170 }}
        />
      </Col>
    </Row>
  )
}

export default Bid
