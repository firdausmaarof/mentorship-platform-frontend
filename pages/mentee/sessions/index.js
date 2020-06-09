import React, { useState, useEffect } from 'react';
import { List, Skeleton, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { withAuth } from 'contexts/api/auth';
import Dashboard from 'components/mentee/Dashboard';
import Api from 'lib/api';
import SessionList from 'components/mentee/SessionList';

function Sessions(props) {
  const { user, loading } = props;

  if (!user || loading) return null;

  return (
    <Dashboard {...props}>
      <SessionList />
    </Dashboard>
  );
}

export default withAuth(Sessions);
