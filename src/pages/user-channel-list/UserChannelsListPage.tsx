import React from 'react';
import { Card, Table, Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  useUserChannelsList,
  useRemoveUserChannel,
} from '@entities/user-channel';
import { RoutePath } from '@shared/config/router';

export const UserChannelsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useUserChannelsList();
  const removeMutation = useRemoveUserChannel();

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      render: (_: any, record: any) => (
        <a
          onClick={() =>
            navigate(RoutePath.UserChannelDetail.replace(':id', record.id))
          }
        >
          {record.title}
        </a>
      ),
    },
    {
      title: 'Telegram ID',
      dataIndex: 'telegramId',
    },
    {
      title: 'Категория',
      dataIndex: 'categoryId',
    },
    {
      title: 'Каналы для рерайта',
      dataIndex: 'channelsToRewrite',
      //render: (v: string[]) => v.join(', '),
    },
    {
      title: 'Действия',
      render: (_: any, record: any) => (
        <Space>
          <Button
            onClick={() =>
              navigate(RoutePath.UserChannelEdit.replace(':id', record.id))
            }
          >
            Редактировать
          </Button>
          <Button danger onClick={() => removeMutation.mutate(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Мои каналы</Typography.Title>

      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => navigate(RoutePath.UserChannelCreate)}
      >
        Создать канал
      </Button>

      <Card>
        <Table
          rowKey="id"
          loading={isLoading}
          dataSource={data}
          columns={columns}
        />
      </Card>
    </div>
  );
};
