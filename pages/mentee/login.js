import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, Alert } from 'antd';
import Router from 'next/router';

import useAuth from 'contexts/api/auth';

const { Title } = Typography;

function Login(props) {
  const { user, login, loading } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) Router.push('/mentee/profile');
  }, [loading]);

  const onFinish = (values) => {
    login(values.email, values.password)
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
        <Col offset="8" span="16">
          <Title level={2}>Login</Title>
        </Col>
        {error && (
          <Alert message={error} type="error" style={{ marginBottom: 15 }} />
        )}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
