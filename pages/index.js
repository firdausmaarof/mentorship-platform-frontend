import { Row, Col, Button, Typography } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

export default function Home() {
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col span={8} align="middle">
        <Col>
          <Title level={2}>Are you a</Title>
        </Col>
        <Button type="primary" htmlType="submit">
          Mentor
        </Button>
        <Col>
          <Title level={2}>or</Title>
        </Col>
        <Link href="/mentee/login">
          <Button type="primary" htmlType="submit">
            Mentee
          </Button>
        </Link>
        <Col>
          <Title level={2}>?</Title>
        </Col>
      </Col>
    </Row>
  );
}
