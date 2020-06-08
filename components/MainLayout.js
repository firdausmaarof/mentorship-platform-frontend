import { Row, Col, Button, Typography, Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link';

import CustomHeader from 'components/mentee/CustomHeader';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

export default function MainLayout(props) {
  return (
    <Layout id="components-layout-demo-fixed" style={{ background: '#fff' }}>
      <CustomHeader />
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fff' }}>
        ©2020 Created by Firdaus Maarof
      </Footer>
    </Layout>
  );
}
