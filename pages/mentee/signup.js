import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, Alert } from 'antd';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import Api from 'lib/api';
import useAuth from 'contexts/api/auth';
import Login from './login';

const { Title } = Typography;

function Signup() {
  const { user, loading, signup } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) Router.push('/mentee/profile');
  }, [loading]);

  const onFinish = (values) => {
    signup(values)
      .then(function (response) {
        setError(null);
        Router.push('/mentee/profile');
      })
      .catch(function (error) {
        setError(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (user || loading) return null;

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col span={8}>
        <Col align="middle">
          <Title level={2}>Mentee Sign Up</Title>
        </Col>
        {error && (
          <Alert message={error} type="error" style={{ marginBottom: 15 }} />
        )}
        <Form
          name="normal_login"
          className="login-form"
          id="components-form-demo-normal-login"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            rules={[
              { required: true, message: 'Please input your password again!' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password Confirmation"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>
            Or{' '}
            <Link href="/mentee/login">
              <a>login now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signup;
