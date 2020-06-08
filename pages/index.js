import { Row, Col, Typography } from 'antd';

import MainLayout from 'components/MainLayout';

const { Title } = Typography;

export default function Home() {
  return (
    <MainLayout>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: '80vh' }}
      >
        <Col span={24} align="middle">
          <Title>Welcome to Mentorship Platform</Title>
        </Col>
      </Row>
    </MainLayout>
  );
}
