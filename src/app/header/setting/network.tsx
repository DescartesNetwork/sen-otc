import { Col, Row, Segmented, Typography } from 'antd'

import configs from 'configs'
import { switchNetwork } from 'configs/net'

const { net } = configs

const Network = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">NETWORK</Typography.Text>
      </Col>
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
    </Row>
  )
}

export default Network
