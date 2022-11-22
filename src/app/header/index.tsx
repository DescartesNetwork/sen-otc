import IconSax from '@sentre/antd-iconsax'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button, Col, Image, Row } from 'antd'

import logo from 'static/images/logo.svg'

const Header = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={18} xxl={16}>
        <Row gutter={[12, 12]} align="middle" wrap={false}>
          <Col flex="auto">
            <Image src={logo} height={24} preview={false} />
          </Col>
          <Col>
            <Button
              type="text"
              size="large"
              shape="circle"
              icon={<IconSax name="Notification" />}
            />
          </Col>
          <Col>
            <WalletMultiButton />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Header
