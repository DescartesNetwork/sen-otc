import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const ItemPair = () => {
  return (
    <Card
      style={{ boxShadow: 'none' }}
      bodyStyle={{ padding: 16 }}
      bordered={false}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row align="middle">
            <Col flex="auto">
              <Space>
                <MintAvatar
                  mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
                />
                <IonIcon name="arrow-forward-outline" />
                <MintAvatar
                  mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
                />
              </Space>
            </Col>
            <Col>
              <Button
                icon={<IonIcon style={{ fontSize: 16 }} name="trash-outline" />}
                type="text"
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>
            <Space size={4}>
              <MintSymbol
                mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
              />
              -
              <MintSymbol
                mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
              />
            </Space>
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Space size={4}>
            <Typography.Text type="secondary">Fee:</Typography.Text>
            <Typography.Text>0.02%</Typography.Text>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default ItemPair
