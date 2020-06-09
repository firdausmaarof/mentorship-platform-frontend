import React, { useState, useEffect } from 'react';
import { Descriptions, Divider, Typography } from 'antd';
import { useRouter } from 'next/router';

import { withAuth } from 'contexts/api/auth';
import Dashboard from 'components/mentee/Dashboard';
import Api from 'lib/api';
import SessionForm from 'components/mentee/mentors/SessionForm';

const { Title } = Typography;

function Mentor(props) {
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

  if (!user || loading) return null;

  return (
    <Dashboard {...props}>
      <Descriptions title={<Title level={3}>Mentor Info</Title>}>
        <Descriptions.Item label="Name">{mentor.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{mentor.email}</Descriptions.Item>
        <Descriptions.Item label="About">{mentor.about}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <SessionForm mentor={mentor} />
    </Dashboard>
  );
}

export default withAuth(Mentor);
