import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useWallet } from '@senhub/providers'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import SelectTokens from 'app/components/selectTokens'

import { useSortedMint } from 'app/hooks/useSortedMint'
import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'
import { useSingleMints } from 'app/hooks/useSingleMints'

const {
  sol: { purchasing, sntrAddress },
} = configs

const NewPair = ({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: (visible: boolean) => void
}) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [mintBid, setMintBid] = useState('')
  const [mintAsk, setMintAsk] = useState('')
  const [loading, setLoading] = useState(false)

  const { accounts } = useAccount()

  const myMints = useMemo(
    () => Object.values(accounts).map((acc) => acc.mint),
    [accounts],
  )
  const singleMints = useSingleMints(myMints)
  const { sortedMints } = useSortedMint(singleMints)

  const selectDefault = useCallback(() => {
    const bidDefault = sortedMints.find((addr) => addr !== sntrAddress) || ''
    setMintBid(bidDefault)
    setMintAsk(sntrAddress)
  }, [sortedMints])

  useEffect(() => {
    selectDefault()
  }, [selectDefault])
  const onCreateNewPair = async () => {
    try {
      setLoading(true)
      const wallet = window.sentre.wallet
      if (!wallet) throw new Error('Login fist')

      const { txId } = await purchasing.initializeRetailer(
        walletAddress,
        mintBid,
        mintAsk,
        wallet,
      )
      notifySuccess('Create pair', txId)
      onClose(false)
    } catch (er) {
      notifyError(er)
    } finally {
      setLoading(false)
    }
  }

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
              onChange={(value) => setMintBid(value)}
              value={mintBid}
              className="pair-selection"
              bordered={false}
              search
              selectFist
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>To</Typography.Text>
            <SelectTokens
              tokens={sortedMints}
              onChange={(value) => setMintAsk(value)}
              value={mintAsk}
              className="pair-selection"
              bordered={false}
              search
            />
          </Space>
        </Col>
        <Col span={24}>
          <Button
            disabled={!mintBid || !mintAsk || mintBid === mintAsk}
            loading={loading}
            type="primary"
            block
            onClick={onCreateNewPair}
          >
            Create
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default NewPair
