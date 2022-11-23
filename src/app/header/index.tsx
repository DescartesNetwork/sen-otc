import IconSax from '@sentre/antd-iconsax'
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { Button, Col, Row } from 'antd'
import Kylan from 'components/kylan'
import MaxWidthLayout from 'components/maxWidthLayout'

const Header = () => {
  return (
    <MaxWidthLayout>
      <Row gutter={[12, 12]} align="middle" wrap={false}>
        <Col flex="auto">
          <Kylan />
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
