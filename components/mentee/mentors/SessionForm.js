import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Alert,
  Row,
  Typography,
  Col,
  DatePicker,
  message,
} from 'antd';
import { useRouter } from 'next/router';

import Api from 'lib/api';

const { Title } = Typography;

export default function SessionForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const mentor_id = router.query.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = (values) => {
    setIsSubmitting(true);
    Api.post('/sessions', values)
      .then((response) => {
        form.resetFields();
        setIsSubmitting(false);
        message.success(response.data.message);
      })
      .catch(function (error) {
        setIsSubmitting(false);
        setError(error.response.data.message);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  return (
    <Row type="flex" justify="center" align="middle">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Row>
          <Col span="24">
            <Title level={2}>Request a Session</Title>
          </Col>
        </Row>
        {error && (
          <Alert message={error} type="error" style={{ marginBottom: 15 }} />
        )}
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          id="components-form-demo-control-hooks"
        >
          <Form.Item name="status" initialValue="pending" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="mentor_id" initialValue={mentor_id} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date & Time"
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime={{ format: 'hh' }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
