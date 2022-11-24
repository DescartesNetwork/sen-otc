import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'antd'
import Kylan from 'components/kylan'
import MaxWidthLayout from 'components/maxWidthLayout'
import Setting from './setting'
import WalletButton from './walletButton'

const Header = () => {
  const navigate = useNavigate()

  return (
    <MaxWidthLayout>
      <Row gutter={[12, 12]} align="middle" wrap={false}>
        <Col flex="auto">
          <Kylan onClick={() => navigate('/')} />
        </Col>
        <Col>
          <Setting />
        </Col>
        <Col>
          <WalletButton />
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default Header
