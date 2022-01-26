import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Typography } from 'antd'

import { AppState } from 'app/model'
import { useMintPrice } from 'app/hooks/useMintPrice'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { numeric } from 'shared/util'

const MIN_PROFIT = 0.01

const ColumnProfit = ({ orderAddress }: { orderAddress: string }) => {
  const {
    orders: {
      [orderAddress]: { retailer, ask_amount, bid_amount },
    },
    retailers: {
      [retailer]: { mint_ask, mint_bid },
    },
  } = useSelector((state: AppState) => state)

  const mintBidPrice = useMintPrice(mint_bid)
  const mintBidDecimals = useMintDecimals(mint_bid) || 0
  const mintAskPrice = useMintPrice(mint_ask)
  const mintAskDecimals = useMintDecimals(mint_ask) || 0

  const amountAsk = Number(utils.undecimalize(ask_amount, mintAskDecimals))
  const amountBid = Number(utils.undecimalize(bid_amount, mintBidDecimals))
  const profit = amountBid * mintBidPrice - amountAsk * mintAskPrice

  if (Math.abs(profit) < MIN_PROFIT)
    return (
      <Typography.Text style={{ color: '#d4b106' }}>
        {'< $0.01'}
      </Typography.Text>
    )

  return (
    <Typography.Text style={{ color: profit > 0 ? '#14E041' : '#D72311' }}>
      {numeric(profit).format('+$ 0,0.[00]')}
    </Typography.Text>
  )
}

export default ColumnProfit
