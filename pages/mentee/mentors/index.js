import React, { useState, useEffect } from 'react';
import { List, Skeleton, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { withAuth } from 'contexts/api/auth';
import Dashboard from 'components/mentee/Dashboard';
import Api from 'lib/api';

function Mentors(props) {
  const [mentors, setMentors] = useState([]);
  const { user, loading } = props;

  useEffect(() => {
    Api.get('/mentors').then(({ data }) => setMentors(data));
  }, []);

  if (!user || loading) return null;

  return (
    <Dashboard {...props}>
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={mentors}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link href={`/mentee/mentors/${item.id}`}>
                <a key="list-loadmore-edit">View</a>
              </Link>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.about}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Dashboard>
  );
}

export default withAuth(Mentors);
