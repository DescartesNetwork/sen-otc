import { Col, Row, Space, Typography } from 'antd'
import { useAskToken, useBidToken } from 'hooks/useNewOrder'

import { usePrice } from 'hooks/useToken'
import configs from 'configs'
import { numeric } from 'helpers/util'

const {
  otc: { partneredTokens },
} = configs

const Price = () => {
  const { bidToken } = useBidToken()
  const { askToken } = useAskToken()
  const [price] = usePrice(
    partneredTokens.find(
      ({ symbol }) => symbol === bidToken || symbol === askToken,
    )?.ticket || '',
  )

  return (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Title level={2}>
            ${numeric(price).format('0,0.[0000]')}
          </Typography.Title>
          <Typography.Text type="secondary">Reference Price</Typography.Text>
        </Space>
      </Col>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Title level={2}>$0</Typography.Title>
          <Typography.Text type="secondary">Offered Price</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Price
