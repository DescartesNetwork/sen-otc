import { Navigate, Route, Routes } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import { ProtectedRoute, ProtectedNavigator } from 'components/protected'
import Header from './header'
import Footer from './footer'
import Watcher from './watcher'
import Home from './home'
import CreateOffer from './createOffer'
import MyOffer from './myOffer'
import History from './history'
import TakeOffer from './takeOffer'

import './index.css'

const App = () => {
  return (
    <Layout className="layout">
      <Row gutter={[24, 64]}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24}>
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedNavigator>
                  <Home />
                </ProtectedNavigator>
              }
            />
            <Route
              path="/offer/:orderAddress"
              element={
                <ProtectedRoute>
                  <TakeOffer />
                </ProtectedRoute>
              }
            />
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
      <Watcher />
    </Layout>
  )
}

export default App
