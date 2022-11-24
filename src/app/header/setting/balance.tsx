import { Col, Row, Space, Typography } from 'antd'
import { numeric } from 'helpers/util'
import { usePrice } from 'hooks/useToken'

import { useLamports } from 'hooks/useWallet'

const Balance = () => {
  const [lamports] = useLamports()
  const [price] = usePrice('solana')

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">BALANCE</Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} wrap={false} align="bottom">
          <Col flex="auto">
            <Space>
              <Typography.Title level={4}>
                {numeric(lamports / 10 ** 9).format('0,0.[000]')}
              </Typography.Title>
              <Typography.Title type="secondary" level={4}>
                SOL
              </Typography.Title>
            </Space>
          </Col>
          <Col>
            <Typography.Text type="secondary">
              ${numeric((lamports / 10 ** 9) * price).format('0,0.[0]')}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Balance
