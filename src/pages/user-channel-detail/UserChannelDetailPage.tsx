import React, { useState } from 'react';
import {
  CopyOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Card, Typography, Button, Space, List, Alert, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { messageApi } from '@entities/message';
import { useUserChannelDetail } from '@entities/user-channel';

const { Title, Text } = Typography;

export const UserChannelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useUserChannelDetail(id!);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);

  if (isLoading) return <div>Загрузка…</div>;
  if (!data) return <div>Не найдено</div>;

  const handleGeneratePost = async () => {
    setIsGenerating(true);
    try {
      const result = await messageApi.rewriteContent({
        userChannelId: data.id,
      });
      setGeneratedMessage(result?.message ?? '');
      message.success('Пост сгенерирован!');
    } catch (err) {
      console.error(err);
      message.error('Ошибка при генерации поста');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      message.success('Скопировано в буфер обмена!');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/user-channels')}
        >
          Назад к списку
        </Button>
        <Button
          type="primary"
          onClick={() => navigate(`/user-channels/${id}/edit`)}
        >
          Редактировать
        </Button>
      </Space>

      <Card
        title={<Title level={3}>{data.title}</Title>}
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            loading={isGenerating}
            onClick={handleGeneratePost}
          >
            Сгенерировать пост
          </Button>
        }
        style={{ marginBottom: 24 }}
      >
        <p>
          <Text strong>Telegram ID:</Text> {data.telegramId}
        </p>
        <p>
          <Text strong>Категория:</Text> {data.category?.name || 'не назначена'}
        </p>

        <div style={{ marginTop: 16 }}>
          <Text strong>Каналы для рерайта:</Text>
          <List
            size="small"
            bordered
            style={{ marginTop: 8 }}
            dataSource={data.channelsToRewrite}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </Card>

      {generatedMessage && (
        <Card
          title="Сгенерированный пост"
          extra={
            <Button icon={<CopyOutlined />} onClick={handleCopy}>
              Скопировать
            </Button>
          }
        >
          <Alert
            message={generatedMessage}
            type="success"
            style={{ whiteSpace: 'pre-wrap', fontSize: 15, lineHeight: 1.6 }}
          />
        </Card>
      )}
    </div>
  );
};
