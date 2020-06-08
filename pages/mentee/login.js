import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, Alert } from 'antd';
import Router from 'next/router';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

import useAuth from 'contexts/api/auth';
import MainLayout from 'components/MainLayout';

const { Title } = Typography;

function Login(props) {
  const { user, login, loading } = useAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) Router.push('/mentee/profile');
  }, [loading]);

  const onFinish = (values) => {
    setIsSubmitting(true);
    login(values.email, values.password)
      .then(function (response) {
        setError(null);
        setIsSubmitting(false);
        Router.push('/mentee/profile');
      })
      .catch(function (error) {
        setIsSubmitting(false);
        setError(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    setIsSubmitting(false);
    console.log('Failed:', errorInfo);
  };

  if (user || loading) return null;

  return (
    <MainLayout>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: '80vh' }}
      >
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Col align="middle">
            <Title level={2}>Mentee Login</Title>
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
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isSubmitting}
              >
                Login
              </Button>
              Or{' '}
              <Link href="/mentee/signup">
                <a>register now!</a>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Login;
