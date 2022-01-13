import { Col, Collapse, Row, Typography } from 'antd'
import { FAQ_CONTENT } from './faq'

const FAQ = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={3}>FAQ</Typography.Title>
      </Col>
      <Col span={24}>
        <Collapse>
          {FAQ_CONTENT.map((faq, idx) => (
            <Collapse.Panel header={`${idx + 1}. ${faq.title}`} key={idx}>
              <Typography.Text>{faq.content}</Typography.Text>
            </Collapse.Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  )
}

export default FAQ
