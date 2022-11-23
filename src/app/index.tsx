import { Navigate, Route, Routes } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import Header from './header'
import Home from './home'

import './index.css'
import Footer from './footer'
import ProtectedRoute from 'components/protectedRoute'
import CreateOffer from './createOffer'
import MyOffer from './myOffer'
import History from './history'

const App = () => {
  return (
    <Layout className="layout">
      <Row gutter={[24, 64]}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/create-offer"
              element={
                <ProtectedRoute onlyAdmin>
                  <CreateOffer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-offer"
              element={
                <ProtectedRoute onlyAdmin>
                  <MyOffer />
                </ProtectedRoute>
              }
            />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Col>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </Layout>
  )
}

export default App
