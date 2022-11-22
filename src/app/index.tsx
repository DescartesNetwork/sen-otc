import { Navigate, Route, Routes } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import Header from './header'
import Home from './home'

import './index.css'

const App = () => {
  return (
    <Layout className="layout">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24} style={{ marginTop: 24 }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Col>
      </Row>
    </Layout>
  )
}

export default App
