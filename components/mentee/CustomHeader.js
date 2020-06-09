import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import {
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

import useAuth from 'contexts/api/auth';

const { Header } = Layout;

export default function CustomHeader() {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      {isAuthenticated ? (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[router.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/mentee/profile" icon={<UserOutlined />}>
            <Link href="/mentee/profile">
              <a>Profile</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/mentee/mentors" icon={<SearchOutlined />}>
            <Link href="/mentee/mentors">
              <a>Find Mentors</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/mentee/sessions" icon={<CalendarOutlined />}>
            <Link href="/mentee/sessions">
              <a>My Sessions</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/mentee/logout"
            icon={<LogoutOutlined />}
            onClick={() => logout()}
            style={{ float: 'right' }}
          >
            Logout
          </Menu.Item>
        </Menu>
      ) : (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[router.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/mentee/login" style={{ float: 'right' }}>
            <Link href="/mentee/login">
              <a>Login</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/mentee/signup" style={{ float: 'right' }}>
            <Link href="/mentee/signup">
              <a>Sign Up</a>
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </Header>
  );
}
