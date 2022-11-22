import { Col, Row } from 'antd'

export type MaxWidthLayoutProps = { children: JSX.Element }

const MaxWidthLayout = ({ children }: MaxWidthLayoutProps) => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={22} lg={20} xl={18} xxl={16}>
        {children}
      </Col>
    </Row>
  )
}

export default MaxWidthLayout
