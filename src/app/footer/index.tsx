import { TwitterOutlined } from '@ant-design/icons'
import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import Kylan from 'components/kylan'
import MaxWidthLayout from 'components/maxWidthLayout'

const SOCIALS = [
  {
    title: 'Home',
    url: 'https://kylan.so',
    icon: <IconSax name="Home2" variant="Bold" />,
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/KylanHQ',
    icon: <TwitterOutlined />,
  },
  {
    title: 'Docs',
    url: 'https://docs.kylan.so',
    icon: <IconSax name="Document" variant="Bold" />,
  },
]

const Footer = () => {
  return (
    <MaxWidthLayout>
      <Row
        gutter={[12, 12]}
        align="middle"
        style={{ marginBottom: 32, borderRight: 'solid 4px #1A63FF' }}
      >
        <Col span={24} style={{ textAlign: 'end' }}>
          <Space size={0}>
            {SOCIALS.map(({ title, url, icon }) => (
              <Button
                key={title}
                type="text"
                size="small"
                onClick={() => window.open(url, '_blank')}
                icon={icon}
              >
                {title}
              </Button>
            ))}
            <Kylan
              size={16}
              style={{ marginLeft: 16 }}
              onClick={() => window.scrollTo(0, 0)}
            />
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
