import { Tag } from 'antd';

const tagColor = {
  pending: 'processing',
  confirmed: 'success',
  cancelled: 'warning',
  rejected: 'error',
};

export default function SessionTag({ status }) {
  return (
    <div>
      <Tag color={tagColor[status]}>{status}</Tag>
    </div>
  );
}
