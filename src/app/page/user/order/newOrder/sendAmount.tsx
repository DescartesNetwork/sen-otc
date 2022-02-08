import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import { AppDispatch, AppState } from 'app/model'
import { setBidAmount } from 'app/model/order.controller'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { numeric } from 'shared/util'
import { MintSymbol } from 'shared/antd/mint'

const SendAmount = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { bidAmount, bidMintAddress },
  } = useSelector((state: AppState) => state)
  const bidAccount = useAccountBalanceByMintAddress(bidMintAddress)

  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Typography.Text className="caption">From</Typography.Text>
          </Col>
          <Col>
            <Space size={4}>
              <Typography.Text type="secondary" className="caption">
                Available:
              </Typography.Text>
              <Typography.Text type="secondary" className="caption">
                {numeric(bidAccount.balance).format('0,0.[00]')}
              </Typography.Text>
              <Typography.Text type="secondary" className="caption">
                <MintSymbol mintAddress={bidMintAddress} />
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <NumericInput
          size="large"
          className="order-amount"
          suffix={
            <Button
              type="text"
              size="small"
              onClick={() => dispatch(setBidAmount(`${bidAccount.balance}`))}
            >
              Max
            </Button>
          }
          value={bidAmount}
          onValue={(amount: string) => dispatch(setBidAmount(amount))}
        />
      </Col>
    </Row>
  )
}

export default SendAmount
