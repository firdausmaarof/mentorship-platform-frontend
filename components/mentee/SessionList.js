import { useState, useEffect } from 'react';
import { List, Avatar, Skeleton, Popconfirm, message, Typography } from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';

import Api from 'lib/api';
import SessionTag from 'components/mentee/SessionTag';

const { Title } = Typography;

export default function SessionList() {
  const [sessions, setSessions] = useState([]);

  const getSessions = () => {
    Api.get('/sessions').then(({ data }) => setSessions(data));
  };

  useEffect(() => {
    getSessions();
  }, []);

  const onCancel = (session_id) => {
    Api.put(`/sessions/${session_id}`, { status: 'cancelled' })
      .then((response) => {
        message.success('Request cancelled successfully');
        getSessions();
      })
      .catch((error) => {
        message.error('Failed to cancelled request');
      });
  };

  return (
    <>
      <Title level={3}>Session List</Title>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={sessions}
        renderItem={(session) => (
          <List.Item actions={[<SessionTag status={session.status} />]}>
            <Skeleton avatar title={false} loading={session.loading} active>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={session.mentor.name}
                description={
                  <>
                    <div>
                      {moment(session.date).format('MMMM Do YYYY, h:mm a')}
                    </div>
                    <div>{session.description}</div>
                  </>
                }
              />
              <div>
                {session.status === 'pending' && (
                  <Popconfirm
                    title="Are you sure to cancel this request?"
                    onConfirm={(e) => onCancel(session.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a key="list-loadmore-more">Cancel Request</a>
                  </Popconfirm>
                )}
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}
