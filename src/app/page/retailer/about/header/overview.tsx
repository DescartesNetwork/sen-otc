import { useUI, useWallet } from '@senhub/providers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

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
  const [totalPair, setTotalPair] = useState(0)
  const [usablePair, setUsablePair] = useState(0)
  const [rejectOrder, setRejectOrder] = useState(0)
  const [approvedOrder, setApprovedOrder] = useState(0)
  const [rate, setRate] = useState(0)

  useEffect(() => {
    const totalPair = Object.keys(retailers).filter((addr) => {
      const { owner } = retailers[addr]
      return owner === walletAddress
    })
    const usablePair = totalPair.filter((addr) => {
      const { state } = retailers[addr]
      return state === RETAILER_STATE.Active
    })

    setUsablePair(usablePair.length)
    setTotalPair(totalPair.length)
  }, [retailers, walletAddress])

  useEffect(() => {
    const rejectedOrder = Object.keys(orders).filter((addr) => {
      const { state } = orders[addr]
      return state === ORDER_STATE_CODE['REJECTED']
    })
    const approvedOrder = Object.keys(orders).filter((addr) => {
      const { state } = orders[addr]
      return state === ORDER_STATE_CODE['APPROVED']
    })
    const rate =
      (approvedOrder.length / (approvedOrder.length + rejectedOrder.length)) *
      100

    setRate(rate)
    setApprovedOrder(approvedOrder.length)
    setRejectOrder(rejectedOrder.length)
  }, [orders])

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
        <Content label="Reject order" value={rejectOrder} />
      </Col>
      <Col span={colSpan}>
        <Content label="Usable pair" value={usablePair} />
      </Col>
      <Col span={colSpan}>
        <Content label="Created pair" value={totalPair} />
      </Col>
    </Row>
  )
}

export default Overview
