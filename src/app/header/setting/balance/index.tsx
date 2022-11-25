import { useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Tooltip, Typography } from 'antd'
import Network from './network'

import { useLamports } from 'hooks/useWallet'
import { numeric, explorer } from 'helpers/util'
import { usePrice, use24hChange } from 'hooks/useToken'

const Balance = () => {
  const { publicKey } = useWallet()
  const [lamports] = useLamports()
  const [price, refreshPrice] = usePrice('solana')
  const [change, refreshChange] = use24hChange('solana')

  const sol = lamports / 10 ** 9

  const refresh = useCallback(() => {
    refreshPrice()
    refreshChange()
  }, [refreshPrice, refreshChange])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false} align="middle">
          <Col flex="auto">
            <Typography.Text type="secondary">BALANCE</Typography.Text>
          </Col>
          <Col>
            <Tooltip title="View on Solscan">
              <Button
                type="text"
                size="small"
                icon={<IconSax name="Discover" />}
                onClick={() =>
                  window.open(explorer(publicKey?.toBase58() || ''), '_blank')
                }
                disabled={!publicKey}
              />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Send SOL">
              <Button
                type="text"
                size="small"
                icon={<IconSax name="Send" />}
                disabled={!publicKey}
              />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Refresh">
              <Button
                type="text"
                size="small"
                icon={<IconSax name="Refresh" />}
                onClick={refresh}
                style={{ marginRight: -4 }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <Row gutter={[4, 4]} wrap={false} align="bottom">
              <Col flex="auto">
                <Space>
                  <Typography.Title level={4}>
                    {numeric(sol).format('0,0.[00]')}
                  </Typography.Title>
                  <Typography.Title type="secondary" level={4}>
                    SOL
                  </Typography.Title>
                </Space>
              </Col>
              <Col>
                <Typography.Text type="secondary">
                  ${numeric(sol * price).format('0,0.[0]')}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[4, 4]} wrap={false}>
              <Col flex="auto">
                <Typography.Text type="secondary">
                  {numeric(price).format('0,0.[0]')} USD/SOL
                </Typography.Text>
              </Col>
              <Col>
                <Space size={4}>
                  <IconSax
                    style={{ color: change >= 0 ? '#52c41a' : '#ff4d4f' }}
                    name={change >= 0 ? 'ArrowCircleUp2' : 'ArrowCircleDown2'}
                    variant="Bold"
                  />
                  <Typography.Text type={change >= 0 ? 'success' : 'danger'}>
                    {numeric(Math.abs(change)).format('0.[0]')}%
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Network />
      </Col>
    </Row>
  )
}

export default Balance
