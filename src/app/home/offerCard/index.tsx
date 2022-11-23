import moment from 'moment'

import IconSax from '@sentre/antd-iconsax'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Progress,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import { ActiveOfferTag, EndedOfferTag, UpcomingOfferTag } from './offerTag'

import { ACCEPTED_PAYMENTS } from 'helpers/acceptedPayments'
import { numeric } from 'helpers/util'
import { useCountdown } from 'hooks/useCountdown'
import { useAction } from 'hooks/useFilter'

const sol = ACCEPTED_PAYMENTS[0]
const stable = ACCEPTED_PAYMENTS[1]

const OfferCard = () => {
  const [action] = useAction()
  const [counter] = useCountdown(20 * 24 * 60 * 60)
  const duration = moment.duration(counter, 'seconds')

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Offer Price</Typography.Text>
          <Space>
            <Avatar src={stable.url} size={40} />
            <Space direction="vertical" size={0}>
              <Typography.Title level={4}>
                {numeric(12.129512).format('0,0.[000]')}
              </Typography.Title>
              <Typography.Text type="secondary">
                {stable.symbol}/{sol.symbol}
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
              <Avatar src={sol.url} size={24} />
              <Typography.Title level={5} style={{ color: '#ffffff' }}>
                {action} {sol.symbol}
              </Typography.Title>
            </Space>
          </Button>
        </Space>
      </Col>
      <Col xs={24} md={8}>
        <Card style={{ height: '100%' }}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">Save</Typography.Text>
            </Col>
            <Col span={24}>
              <Space>
                <Typography.Title style={{ color: '#1A63FF' }} level={5}>
                  3%
                </Typography.Title>
                <Tooltip title="Compared to the reference market price on CoinGecko.">
                  <Button
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<IconSax name="Information" />}
                  />
                </Tooltip>
              </Space>
            </Col>
            <Col span={24}>
              <Typography.Paragraph type="secondary">-</Typography.Paragraph>
              <Typography.Link>View the price on CoinGecko</Typography.Link>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card style={{ height: '100%' }}>
          <Row gutter={[8, 8]} align="middle">
            <Col span={24}>
              <Typography.Text type="secondary">Start In</Typography.Text>
            </Col>
            <Col span={24}>
              <Space>
                <Typography.Title style={{ color: '#1A63FF' }} level={5}>
                  {`${duration.days()}d : ${duration.hours()}h : ${duration.minutes()}m`}
                </Typography.Title>
                <Progress
                  type="circle"
                  percent={100 - duration.seconds() / 0.6}
                  width={14}
                />
              </Space>
            </Col>
            <Col span={24} style={{ marginTop: 22 }}>
              <Space>
                <ActiveOfferTag />
                <UpcomingOfferTag />
                <EndedOfferTag />
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card style={{ height: '100%' }}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary">Available</Typography.Text>
            </Col>
            <Col span={24}>
              <Space>
                <Typography.Title level={5}>
                  {numeric(6000).format('0,0.[000]')}
                </Typography.Title>
                <Avatar src={sol.url} size={24} />
                <Typography.Title type="secondary" level={5}>
                  {sol.symbol}
                </Typography.Title>
              </Space>
            </Col>
            <Col span={24}>
              <Typography.Paragraph type="secondary">-</Typography.Paragraph>
              <Typography.Link>View it on Solscan</Typography.Link>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Divider style={{ marginBottom: 0 }} />
      </Col>
    </Row>
  )
}

export default OfferCard
