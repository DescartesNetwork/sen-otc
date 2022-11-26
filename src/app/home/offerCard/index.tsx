import IconSax from '@sentre/antd-iconsax'
import { Avatar, Button, Col, Row, Space, Typography } from 'antd'
import InfoCard from './infoCard'

import { numeric } from 'helpers/util'
import { useAction } from 'hooks/useFilter'
import { useOrderSelector } from 'hooks/useOrder'
import { useMetadataByAddress } from 'hooks/useToken'

export type OfferCardProps = {
  address: string
}

const OfferCard = ({ address }: OfferCardProps) => {
  const [action] = useAction()

  const { aToken, bToken } = useOrderSelector((orders) => orders[address])
  const { url: aUrl, symbol: aSymbol } =
    useMetadataByAddress(aToken.toBase58()) || {}
  const { url: bUrl, symbol: bSymbol } =
    useMetadataByAddress(bToken.toBase58()) || {}

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Offer Price</Typography.Text>
          <Space>
            <Avatar src={aUrl} size={40} />
            <Space direction="vertical" size={0}>
              <Typography.Title level={4}>
                {numeric(12.129512).format('0,0.[000]')}
              </Typography.Title>
              <Typography.Text type="secondary">
                {aSymbol}/{bSymbol}
              </Typography.Text>
            </Space>
          </Space>
        </Space>
      </Col>
      <Col span={12} style={{ textAlign: 'end' }}>
        <Space direction="vertical">
          <Space>
            <Typography.Text type="secondary">Offer ID: 1234</Typography.Text>
            <Button
              type="text"
              size="small"
              shape="circle"
              icon={<IconSax name="ExportCircle" />}
            />
          </Space>
          <Button type="primary" size="large" shape="round">
            <Space style={{ position: 'relative', top: -3 }}>
              <Avatar src={bUrl} size={24} />
              <Typography.Title level={5} style={{ color: '#ffffff' }}>
                {action} {bSymbol}
              </Typography.Title>
            </Space>
          </Button>
        </Space>
      </Col>
      <Col xs={24}>
        <InfoCard />
      </Col>
    </Row>
  )
}

export default OfferCard
