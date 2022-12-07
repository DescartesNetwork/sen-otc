import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import Kylan from 'components/kylan'
import MaxWidthLayout from 'components/maxWidthLayout'

const SOCIALS = [
  {
    title: 'Home',
    url: 'https://kylan.so',
    icon: <IconSax name="Home2" variant="Bold" />,
    disabled: true,
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/KylanHQ',
    icon: <TwitterOutlined />,
  },
  {
    title: 'Telegram',
    url: 'https://t.me/KylanHQ',
    icon: <IconSax name="Send2" variant="Bold" />,
    disabled: true,
  },
  {
    title: 'Docs',
    url: 'https://docs.kylan.so',
    icon: <IconSax name="Book" variant="Bold" />,
    disabled: true,
  },
  {
    title: 'SDK',
    url: 'https://sdk.kylan.so',
    icon: <IconSax name="Box" variant="Bold" />,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/DescartesNetwork/sen-otc',
    icon: <GithubOutlined />,
  },
]

const Footer = () => {
  return (
    <MaxWidthLayout>
      <Row
        gutter={[12, 12]}
        align="middle"
        className="kylan-dash left"
        style={{ marginTop: 32, marginBottom: 32 }}
      >
        <Col span={24} style={{ textAlign: 'end' }}>
          <Kylan size={16} onClick={() => window.scrollTo(0, 0)} />
        </Col>
        <Col span={24} style={{ textAlign: 'end' }}>
          <Space size={4} wrap={true} style={{ justifyContent: 'end' }}>
            {SOCIALS.map(({ title, url, icon, disabled }) => (
              <Button
                key={title}
                type="text"
                size="small"
                onClick={() => window.open(url, '_blank')}
                icon={icon}
                disabled={disabled}
              >
                {title}
              </Button>
            ))}
          </Space>
        </Col>
        <Col span={24} style={{ textAlign: 'end' }}>
          <Typography.Text>
            Copyright © 2022 Kylan. All Rights Reserved.
          </Typography.Text>
        </Col>
      </Row>
    </MaxWidthLayout>
  )
}

export default Footer
