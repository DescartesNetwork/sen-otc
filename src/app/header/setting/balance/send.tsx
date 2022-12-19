import { useCallback, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { isAddress } from '@sentre/otc'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Input, message, Popover, Row, Tooltip } from 'antd'

import { explorer } from 'helpers/util'
import { useLamports } from 'hooks/useWallet'

const Send = () => {
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const { publicKey } = useWallet()
  const { transfer } = useLamports()

  const onSend = useCallback(async () => {
    try {
      if (!publicKey || !isAddress(address) || !Number(amount)) return
      setLoading(true)
      const txId = await transfer(Number(amount) * 10 ** 9, address)
      return message.success({
        content: `You have sent ${amount} SOL. Click here to view!`,
        onClick: () => window.open(explorer(txId), '_blank'),
        style: { cursor: 'pointer' },
      })
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(false)
    }
  }, [address, amount, publicKey, transfer])

  return (
    <Tooltip title="Send SOL">
      <Popover
        trigger={['click']}
        title="Send Sol"
        placement="topRight"
        arrowPointAtCenter
        content={
          <Row gutter={[12, 12]} style={{ width: 300 }}>
            <Col span={16}>
              <Input
                placeholder="Receiver Address"
                size="large"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Amount"
                size="large"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                suffix={
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={onSend}
                    style={{ marginRight: -4 }}
                    disabled={!isAddress(address) || !Number(amount)}
                    icon={<IconSax name="Send" />}
                    loading={loading}
                    block
                  />
                }
              />
            </Col>
          </Row>
        }
      >
        <Button
          type="text"
          size="small"
          icon={<IconSax name="Send" />}
          disabled={!publicKey}
        />
      </Popover>
    </Tooltip>
  )
}

export default Send
