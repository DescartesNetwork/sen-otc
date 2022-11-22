import { Col, Layout, Row } from 'antd'
import Header from './header'

import './index.css'

const App = () => {
  return (
    <Layout className="layout">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
    </Layout>
  )
}

export default App
