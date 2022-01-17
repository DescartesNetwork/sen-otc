import { useSelector } from 'react-redux'

import { Row, Col, Image } from 'antd'
import User from './user'
import Retailer from './retailer'

import Watcher from 'app/components/watcher'
import { AppState } from 'app/model'
import HeroBanner from 'app/static/images/otc-banner.svg'
import './index.less'

const Page = () => {
  const { retailerMode } = useSelector((state: AppState) => state.main)

  return (
    <Watcher>
      <Row gutter={[24, 24]} justify="center" style={{ paddingBottom: 12 }}>
        <Col xs={24} lg={18}>
          <Row gutter={[24, 24]}>
            <Col span={24} className="otc-banner">
              <Image src={HeroBanner} preview={false} />
            </Col>
            <Col span={24}>{retailerMode ? <Retailer /> : <User />}</Col>
          </Row>
        </Col>
      </Row>
    </Watcher>
  )
}

export default Page
