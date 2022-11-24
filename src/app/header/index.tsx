import { MouseEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'

import IconSax from '@sentre/antd-iconsax'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button, Col, Row } from 'antd'
import Kylan from 'components/kylan'
import MaxWidthLayout from 'components/maxWidthLayout'

const Header = () => {
  const navigate = useNavigate()
  const { disconnect, publicKey, wallet, connecting } = useWallet()

  const onDisconnect = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      return disconnect()
    },
    [disconnect],
  )

  return (
    <MaxWidthLayout>
      <Row gutter={[12, 12]} align="middle" wrap={false}>
        <Col flex="auto">
          <Kylan onClick={() => navigate('/')} />
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
          <WalletMultiButton
            endIcon={
              wallet && !publicKey && !connecting ? (
                <IconSax name="CloseCircle" onClick={onDisconnect} />
              ) : undefined
            }
          />
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default Header
