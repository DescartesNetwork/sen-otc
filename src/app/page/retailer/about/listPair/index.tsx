import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import { AppState } from 'app/model'
import ItemPair from './itemPair'

import { useWallet } from '@senhub/providers'

const ListPair = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { retailers } = useSelector((state: AppState) => state)

  const myPairs: string[] = useMemo(
    () =>
      Object.keys(retailers).filter((addr) => {
        const { owner } = retailers[addr]
        return owner === walletAddress
      }),
    [retailers, walletAddress],
  )

  return (
    <Row gutter={[24, 24]}>
      {myPairs.map((address) => (
        <Col lg={6} md={8} sm={12} xs={24} key={address}>
          <ItemPair address={address} />
        </Col>
      ))}
    </Row>
  )
}

export default ListPair
