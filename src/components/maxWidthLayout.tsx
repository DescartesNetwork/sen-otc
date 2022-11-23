import { Col, Row } from 'antd'

export type MaxWidthLayoutProps = {
  children: JSX.Element
  level?: 0 | 1 | 2 | 3
}

const GRIDS = [
  { xs: 24, md: 22, lg: 20, xl: 18, xxl: 16 }, // Alias of level 1
  { xs: 24, md: 22, lg: 20, xl: 18, xxl: 16 },
  { xs: 24, md: 20, lg: 16, xl: 12, xxl: 8 },
  { xs: 24, sm: 18, md: 14, lg: 12, xl: 8, xxl: 6 },
]

const MaxWidthLayout = ({ children, level = 0 }: MaxWidthLayoutProps) => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col {...GRIDS[level]}>{children}</Col>
    </Row>
  )
}

export default MaxWidthLayout
