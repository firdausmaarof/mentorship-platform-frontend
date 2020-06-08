import React, { useState, useEffect } from 'react';
import {
  Descriptions,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import moment from 'moment';

import { withAuth } from 'contexts/api/auth';
import Dashboard from 'components/mentee/dashboard';
import Api from 'lib/api';

const { RangePicker } = DatePicker;

function Mentor(props) {
  const [form] = Form.useForm();
  const [mentor, setMentor] = useState([]);
  const { user, loading } = props;
  const router = useRouter();

  useEffect(() => {
    const mentor_id = router.query.id;
    if (mentor_id)
      Api.get(`/mentors/${mentor_id}`)
        .then((response) => {
          setMentor(response.data);
        })
        .catch((error) => console.log(error.response));
  }, [loading]);

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  function disabledRangeTime(_, type) {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }

  if (!user || loading) return null;

  return (
    <Dashboard {...props}>
      <Descriptions title="Mentor Info">
        <Descriptions.Item label="Name">{mentor.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{mentor.email}</Descriptions.Item>
      </Descriptions>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="date"
          rules={[
            {
              required: true,
              message: 'Please choose your date',
            },
          ]}
        >
          <DatePicker
          // disabledDate={disabledDate}
          // disabledTime={disabledRangeTime}
          // showTime={{ format: 'hh' }}
          // format="YYYY-MM-DD hh:mm"
          />
        </Form.Item>
        <Form.Item
          name="time"
          rules={[
            {
              required: true,
              message: 'Please choose your time',
            },
          ]}
        >
          <TimePicker.RangePicker
            // disabledDate={disabledDate}
            // disabledTime={disabledRangeTime}
            showTime={{ format: 'hh' }}
            // format="YYYY-MM-DD hh:mm"
          />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button type="primary" htmlType="submit">
              Request Session
            </Button>
          )}
        </Form.Item>
      </Form>
    </Dashboard>
  );
}

export default withAuth(Mentor);
