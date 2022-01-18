import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import { AppState } from 'app/model'
import ItemPair from './itemPair'

import { useWallet } from '@senhub/providers'
import { RETAILER_STATE } from 'app/constant/retailer'

const ListPair = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { retailers } = useSelector((state: AppState) => state)

  const myPairs: string[] = useMemo(
    () =>
      Object.keys(retailers).filter((addr) => {
        const { owner, state } = retailers[addr]
        return owner === walletAddress && state === RETAILER_STATE.Active
      }),
    [retailers, walletAddress],
  )

  return (
    <Row gutter={[24, 24]}>
      {myPairs.map((address) => (
        <Col span={6} key={address}>
          <ItemPair address={address} />
        </Col>
      ))}
    </Row>
  )
}

export default ListPair
