import React from 'react';
import { Descriptions, Typography } from 'antd';

import { withAuth } from 'contexts/api/auth';
import Dashboard from 'components/mentee/Dashboard';

const { Title } = Typography;

function Profile(props) {
  const { user, loading } = props;

  if (!user || loading) return null;

  return (
    <Dashboard {...props}>
      <Descriptions title={<Title level={2}>Profile Info</Title>}>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      </Descriptions>
    </Dashboard>
  );
}

export default withAuth(Profile);
