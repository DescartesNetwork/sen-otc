import { useSelector } from 'react-redux'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { useRetailerFee } from 'app/hooks/useRetailerFee'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'
import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'
import { RetailerState } from 'app/constant/retailer'

const {
  sol: { purchasing },
} = configs

const ItemPair = ({ address }: { address: string }) => {
  const {
    retailers: { [address]: retailerData },
  } = useSelector((state: AppState) => state)
  const { fee } = useRetailerFee(address)

  const onFreeze = async () => {
    try {
      const wallet = window.sentre.wallet
      if (!wallet) throw new Error('Login fist')
      const { txId } = await purchasing.freezeRetailer(address, wallet)
      notifySuccess('Freeze', txId)
    } catch (er) {
      notifyError(er)
    }
  }
  const onThaw = async () => {
    try {
      const wallet = window.sentre.wallet
      if (!wallet) throw new Error('Login fist')
      const { txId } = await purchasing.thawRetailer(address, wallet)
      notifySuccess('Thaw', txId)
    } catch (er) {
      notifyError(er)
    }
  }
  const frozen = retailerData.state === RetailerState.Frozen

  return (
    <Card
      style={{ boxShadow: 'none' }}
      bodyStyle={{ padding: 16 }}
      bordered={false}
      className={frozen ? 'frozen-card' : ''}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row align="middle">
            <Col flex="auto">
              <Space>
                <MintAvatar mintAddress={retailerData.mint_bid} />
                <IonIcon name="arrow-forward-outline" />
                <MintAvatar mintAddress={retailerData.mint_ask} />
              </Space>
            </Col>
            <Col>
              <Button
                icon={
                  <IonIcon
                    style={{ fontSize: 16, opacity: 1 }}
                    name={frozen ? 'sunny-outline' : 'snow-outline'}
                  />
                }
                type="text"
                onClick={frozen ? onThaw : onFreeze}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>
            <Space size={4}>
              <MintSymbol mintAddress={retailerData.mint_bid} />
              -
              <MintSymbol mintAddress={retailerData.mint_ask} />
            </Space>
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Space size={4}>
            <Typography.Text type="secondary">Fee:</Typography.Text>
            <Typography.Text>
              {numeric(fee).format('0,0.[00]%')}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default ItemPair
