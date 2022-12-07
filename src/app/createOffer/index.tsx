import { useNavigate } from 'react-router-dom'

import IconSax from '@sentre/antd-iconsax'
import { Button, Col, Row, Space, Typography } from 'antd'
import MaxWidthLayout from 'components/maxWidthLayout'
import Mode from './mode'
import Stat from './stat'
import StartedAt from './startedAt'
import EndedAt from './endedAt'
import Whitelist from './whitelist'
import CreateButton from './createButton'
import Amount from './amount'

import { ActionProvider } from 'providers/action.provider'
import { DatetimeProvider } from 'providers/datetime.provider'
import { BidProvider } from 'providers/bid.provider'
import { AskProvider } from 'providers/ask.provider'

const CreateOffer = () => {
  const navigate = useNavigate()

  return (
    <ActionProvider>
      <DatetimeProvider>
        <BidProvider>
          <AskProvider>
            <MaxWidthLayout level={3}>
              <Row gutter={[12, 24]}>
                <Col span={24}>
                  <Space>
                    <Button
                      size="large"
                      type="text"
                      icon={<IconSax name="ArrowLeft2" />}
                      onClick={() => navigate('/home')}
                      style={{ marginLeft: -8 }}
                    />
                    <Typography.Title level={2}>
                      Create an Offer
                    </Typography.Title>
                  </Space>
                </Col>
                <Col span={24} style={{ textAlign: 'end' }}>
                  <Mode />
                </Col>
                <Col span={24}>
                  <Amount />
                </Col>
                <Col span={24}>
                  <Stat />
                </Col>
                <Col span={12}>
                  <StartedAt />
                </Col>
                <Col span={12}>
                  <EndedAt />
                </Col>
                <Col span={24}>
                  <Whitelist />
                </Col>
                <Col span={12}>
                  <Button
                    size="large"
                    shape="round"
                    onClick={() => navigate('/home')}
                    block
                  >
                    Cancel
                  </Button>
                </Col>
                <Col span={12}>
                  <CreateButton />
                </Col>
              </Row>
            </MaxWidthLayout>
          </AskProvider>
        </BidProvider>
      </DatetimeProvider>
    </ActionProvider>
  )
}

export default CreateOffer
