import React, { useState, useEffect } from 'react';
import { Descriptions, Typography, Popconfirm, message } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';

import { withAuth } from 'contexts/api/auth';
import Dashboard from 'components/mentee/Dashboard';
import Api from 'lib/api';
import SessionTag from 'components/mentee/SessionTag';

const { Title } = Typography;

function Mentor(props) {
  const [session, setSession] = useState(null);
  const { loading } = props;
  const router = useRouter();

  useEffect(() => {
    const session_id = router.query.id;
    if (session_id) getSession(session_id);
  }, [loading]);

  const getSession = (session_id) => {
    Api.get(`/sessions/${session_id}`)
      .then((response) => {
        setSession(response.data);
      })
      .catch((error) => console.log(error.response));
  };

  const onCancel = (session_id) => {
    Api.put(`/sessions/${session_id}`, { status: 'cancelled' })
      .then((response) => {
        message.success('Request cancelled successfully');
        getSession(session_id);
      })
      .catch((error) => {
        message.error('Failed to cancelled request');
      });
  };

  if (!session) return null;

  return (
    <Dashboard {...props}>
      <Descriptions title={<Title level={3}>Session Info</Title>}>
        <Descriptions.Item label="Mentor">
          {session.mentor.name}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {moment(session.date).format('MMMM Do YYYY, h:mm a')}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {session.description}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <SessionTag status={session.status} />
        </Descriptions.Item>
        {session.status === 'pending' && (
          <Descriptions.Item label="Action">
            <Popconfirm
              title="Are you sure to cancel this request?"
              onConfirm={(e) => onCancel(session.id)}
              okText="Yes"
              cancelText="No"
            >
              <a key="list-loadmore-more">Cancel Request</a>
            </Popconfirm>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Dashboard>
  );
}

export default withAuth(Mentor);
