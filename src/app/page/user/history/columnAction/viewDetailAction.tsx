import { account } from '@senswap/sen-js'

import { Button, Col, Row } from 'antd'

import { explorer } from 'shared/util'

const ViewDetailAction = ({ orderAddress }: { orderAddress: string }) => {
  const onViewDetail = async () => {
    if (!account.isAddress(orderAddress)) return
    window.open(explorer(orderAddress), '_blank')
  }

  return (
    <Row>
      <Col span={24}>
        <Button type="text" size="small" onClick={onViewDetail} block>
          Detail
        </Button>
      </Col>
    </Row>
  )
}

export default ViewDetailAction
