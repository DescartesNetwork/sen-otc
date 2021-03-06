import { useState } from 'react'
import { useWallet } from '@senhub/providers'

import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NewPair from '../newPair'
import Overview from './overview'

import { explorer, shortenAddress } from 'shared/util'
import { useDevice } from 'app/hooks/useDevice'

const Header = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [visible, setVisible] = useState(false)
  const { isMobile } = useDevice()

  const dividerType = isMobile ? 'horizontal' : 'vertical'
  const colSpan = isMobile ? 24 : undefined

  return (
    <Card className="header-about" bordered={false}>
      <Row gutter={[24, 24]}>
        <Col>
          <Space size={4} direction="vertical">
            <Space size={12}>
              <Typography.Text>Retailer</Typography.Text>
              <IonIcon
                name="open-outline"
                onClick={() => window.open(explorer(walletAddress))}
              />
            </Space>
            <Typography.Text className="caption" type="secondary">
              {shortenAddress(walletAddress)}
            </Typography.Text>
          </Space>
        </Col>
        <Col span={colSpan}>
          <Divider
            type={dividerType}
            style={{ color: ' #D3D3D6', height: '100%', margin: 0 }}
          />
        </Col>
        <Col span={colSpan} flex="auto">
          <Overview />
        </Col>
        <Col span={colSpan}>
          <Button
            type="primary"
            icon={<IonIcon name="add-outline" />}
            onClick={() => setVisible(true)}
            block={isMobile}
          >
            New Pair
          </Button>
        </Col>
      </Row>
      <NewPair visible={visible} onClose={setVisible} />
    </Card>
  )
}

export default Header
