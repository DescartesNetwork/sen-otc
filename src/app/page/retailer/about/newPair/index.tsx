import { useMemo, useState } from 'react'
import { useAccount } from '@senhub/providers'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'
import SelectTokens from './selectTokens'

import { useSortedMint } from 'app/hooks/useSortedMint'

const NewPair = ({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: (visible: boolean) => void
}) => {
  const [valueFrom, setValueFrom] = useState('Select')
  const [valueTo, setValueTo] = useState('Select')
  const [fee, setFee] = useState('')

  const { accounts } = useAccount()
  const tokens = useMemo(
    () => Object.values(accounts).map((acc) => acc.mint),
    [accounts],
  )
  const { sortedMints } = useSortedMint(tokens)

  return (
    <Modal
      visible={visible}
      title={<Typography.Title level={5}>New pair</Typography.Title>}
      closeIcon={<IonIcon name="close-outline" />}
      footer={null}
      onCancel={() => onClose(false)}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>From</Typography.Text>
            <SelectTokens
              tokens={sortedMints}
              onChange={(value) => setValueFrom(value)}
              value={valueFrom}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>To</Typography.Text>
            <SelectTokens
              tokens={sortedMints}
              onChange={(value) => setValueTo(value)}
              value={valueTo}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>Fee (%)</Typography.Text>
            <NumericInput
              style={{ height: 40 }}
              placeholder="0"
              value={fee}
              onValue={(value) => setFee(value)}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Button
            disabled={!valueFrom || !valueTo || !fee}
            type="primary"
            block
          >
            Create
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default NewPair
