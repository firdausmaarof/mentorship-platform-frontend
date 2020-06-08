import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, Alert } from 'antd';
import Router from 'next/router';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import useAuth from 'contexts/api/auth';
import MainLayout from 'components/MainLayout';

const { Title } = Typography;

function Signup() {
  const { user, loading, signup } = useAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) Router.push('/mentee/profile');
  }, [loading]);

  const onFinish = (values) => {
    setIsSubmitting(true);
    signup(values)
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
            onFinishFailed={onFinishFailed}
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
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="password_confirmation"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
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
                loading={isSubmitting}
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
    </MainLayout>
  );
}

export default Signup;
