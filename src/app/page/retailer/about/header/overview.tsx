import { useUI, useWallet } from '@senhub/providers'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import { Col, Row, Typography } from 'antd'

import { AppState } from 'app/model'
import { RETAILER_STATE } from 'app/constant/retailer'
import { ORDER_STATE_CODE } from 'app/constant'

const Content = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  const {
    ui: { infix },
  } = useUI()

  const isMobile = infix === 'xs'
  const colSpan = !isMobile ? 24 : undefined
  const flexType = isMobile ? 'auto' : undefined

  return (
    <Row>
      <Col span={colSpan} flex={flexType}>
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col span={colSpan}>
        <Typography.Title level={5}>{value}</Typography.Title>
      </Col>
    </Row>
  )
}

const Overview = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const {
    ui: { infix },
  } = useUI()
  const { retailers, orders } = useSelector((state: AppState) => state)

  const totalPair = useMemo(
    () =>
      Object.keys(retailers).filter((addr) => {
        const { owner } = retailers[addr]
        return owner === walletAddress
      }),
    [retailers, walletAddress],
  )

  const usablePair = useMemo(
    () =>
      totalPair.filter((addr) => {
        const { state } = retailers[addr]
        return state === RETAILER_STATE.Active
      }).length,
    [retailers, totalPair],
  )

  const rejectedOrder = useMemo(
    () =>
      Object.keys(orders).filter((addr) => {
        const { state } = orders[addr]
        return state === ORDER_STATE_CODE['REJECTED']
      }).length,
    [orders],
  )

  const approvedOrder = useMemo(
    () =>
      Object.keys(orders).filter((addr) => {
        const { state } = orders[addr]
        return state === ORDER_STATE_CODE['APPROVED']
      }).length,
    [orders],
  )

  const rate = (approvedOrder / (approvedOrder + rejectedOrder)) * 100

  const isMobile = infix === 'xs'
  const colSpan = isMobile ? 24 : undefined

  return (
    <Row gutter={{ lg: 12, xl: 24 }}>
      <Col span={colSpan}>
        <Content label="Rate" value={`${rate.toFixed(2)} %`} />
      </Col>
      <Col span={colSpan}>
        <Content label="Approved order" value={approvedOrder} />
      </Col>
      <Col span={colSpan}>
        <Content label="Reject order" value={rejectedOrder} />
      </Col>
      <Col span={colSpan}>
        <Content label="Usable pair" value={usablePair} />
      </Col>
      <Col span={colSpan}>
        <Content label="Created pair" value={totalPair.length} />
      </Col>
    </Row>
  )
}

export default Overview
