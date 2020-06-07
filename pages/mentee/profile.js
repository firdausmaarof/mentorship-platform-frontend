import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';

import { withAuth } from 'contexts/api/auth';
import Dashboard from 'components/mentee/dashboard';

function Profile(props) {
  const { user, loading } = props;

  if (!user || loading) return null;

  return (
    <Dashboard {...props}>
      <Descriptions title="Profile Info">
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      </Descriptions>
    </Dashboard>
  );
}

export default withAuth(Profile);
