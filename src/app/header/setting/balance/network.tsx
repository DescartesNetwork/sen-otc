import { Col, Row, Segmented, Typography } from 'antd'

import { net, switchNetwork } from 'configs/net'

const Network = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Segmented
          size="large"
          style={{ padding: 6 }}
          options={[
            { value: 'devnet', label: 'Devnet' },
            { value: 'testnet', label: 'Testnet' },
            { value: 'mainnet', label: 'Mainnet' },
          ]}
          value={net}
          onChange={(e: any) => switchNetwork(e)}
          block
        />
      </Col>
      <Col span={24} style={{ textAlign: 'end' }}>
        <Typography.Paragraph type="secondary" style={{ fontSize: 10 }}>
          * The browser will be reloaded while changing network
        </Typography.Paragraph>
      </Col>
    </Row>
  )
}

export default Network
