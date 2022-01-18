import { useState } from 'react'

import { Button, Col, Row } from 'antd'

import configs from 'app/configs'
import { explorer } from 'shared/util'
import { account } from '@senswap/sen-js'

const {
  sol: { purchasing },
} = configs

const ViewDetailAction = ({ orderAddress }: { orderAddress: string }) => {
  const onViewDetail = async () => {
    // window.open(explorer(orderAddress), '_blank')
    if (account.isAddress(orderAddress)) {
      const b = await window.sentre.splt.getMultiSigData(orderAddress)
      console.log(b, 'kkk')
    }
  }

  return (
    <Row>
      <Col span={24}>
        <Button size="small" onClick={onViewDetail} block>
          Detail
        </Button>
      </Col>
    </Row>
  )
}

export default ViewDetailAction
