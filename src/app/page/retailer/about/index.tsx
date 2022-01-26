import { Col, Row } from 'antd'
import ListPair from './listPair'
import Header from './header'

const About = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={24}>
        <ListPair />
      </Col>
    </Row>
  )
}

export default About
