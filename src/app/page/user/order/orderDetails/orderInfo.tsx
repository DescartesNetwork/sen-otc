import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Button, Col, Row, Space } from 'antd'
import RowInfo from './rowInfo'

import { AppDispatch, AppState } from 'app/model'
import { numeric } from 'shared/util'
import { useRetailerFee } from 'app/hooks/useRetailerFee'
import IonIcon from 'shared/antd/ionicon'
import { onHandleModalRetailer } from 'app/model/main.controller'
import { account } from '@senswap/sen-js'

const OrderInfo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    order: { retailerAddress, bidAmount },
  } = useSelector((state: AppState) => state)
  const { fee } = useRetailerFee(retailerAddress)
  const demoFee = fee > 0 ? numeric(fee).format('0,0.[00]%') : '--'
  const existedRetailer = account.isAddress(retailerAddress)
  const bidVal = Number(bidAmount)

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <RowInfo
          label="Order day"
          value={moment(new Date()).format('DD/MM/YYYY')}
        />
      </Col>
      <Col span={12}>
        <RowInfo label="Network fee" value={demoFee} />
      </Col>
      <Col span={12}>
        <Space align="start">
          <RowInfo
            label="Retailer"
            value={existedRetailer ? 'Dong 01' : '--'}
          />
          {existedRetailer && (
            <Button
              type="text"
              size="small"
              icon={<IonIcon name="repeat-outline" />}
              onClick={() => dispatch(onHandleModalRetailer({ visible: true }))}
              disabled={bidVal === 0}
            />
          )}
        </Space>
      </Col>
      <Col span={12}>
        <RowInfo label="Retailer fee" value={demoFee} />
      </Col>
    </Row>
  )
}
export default OrderInfo
