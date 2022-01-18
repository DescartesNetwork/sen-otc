import { useState } from 'react'
import { useUI } from '@senhub/providers'

import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NewPair from '../newPair'
import Overview from './overview'

import { shortenAddress } from 'shared/util'

const Header = () => {
  const [visible, setVisible] = useState(false)
  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'
  const dividerType = isMobile ? 'horizontal' : 'vertical'
  const colSpan = isMobile ? 24 : undefined
  return (
    <Card className="header-about" bordered={false}>
      <Row gutter={[24, 24]}>
        <Col>
          <Space size={4} direction="vertical">
            <Space size={12}>
              <Typography.Text>Retailer 1</Typography.Text>
              <IonIcon name="open-outline" />
            </Space>
            <Typography.Text className="caption" type="secondary">
              {shortenAddress('I1s3...s923')}
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
