import IconSax from '@sentre/antd-iconsax'
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { Button, Col, Image, Row } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'

import logo from 'static/images/logo.svg'

const Header = () => {
  return (
    <MaxWidthLayout>
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
          <WalletModalProvider>
            <WalletMultiButton />
          </WalletModalProvider>
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default Header
