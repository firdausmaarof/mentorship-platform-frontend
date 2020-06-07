import { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Header, Content, Footer, Sider } = Layout;

function Dashboard(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = props;
  const router = useRouter();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">{!collapsed && <span>FutureLab</span>}</div>
        <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline">
          <Menu.Item key="/mentee/profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="/mentee/mentors" icon={<SearchOutlined />}>
            Find Mentors
          </Menu.Item>
          <Menu.Item key="/mentee/sessions" icon={<CalendarOutlined />}>
            My Sessions
          </Menu.Item>
          {user && (
            <Menu.Item
              key="/mentee/logout"
              icon={<LogoutOutlined />}
              onClick={() => logout()}
            >
              Logout
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: '10px 20px' }}
        >
          <Typography.Title level={2}>Mentorship System</Typography.Title>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2020 Created by Firdaus Maarof
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
