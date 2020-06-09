import { Layout, Row, Col } from 'antd';

import CustomHeader from 'components/mentee/CustomHeader';

const { Content, Footer } = Layout;

function Dashboard(props) {
  return (
    <Layout id="components-layout-demo-fixed" style={{ background: '#fff' }}>
      <CustomHeader />
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64, minHeight: '80vh' }}
      >
        <Row style={{ padding: '50px 0' }}>
          <Col span="24">{props.children}</Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fff' }}>
        ©2020 Created by Firdaus Maarof
      </Footer>
    </Layout>
  );
}

export default Dashboard;
