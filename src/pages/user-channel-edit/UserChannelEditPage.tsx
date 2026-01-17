import React from 'react';
import { Card, Form, Input, Typography, Select } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUserChannelDetail,
  useUpdateUserChannel,
} from '@entities/user-channel';
import { normalizeChannels } from '@entities/user-channel/lib/util';
import { RoutePath } from '@shared/config/router';
import { Button } from '@shared/ui';

export const UserChannelEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useUserChannelDetail(id!);

  const updateMutation = useUpdateUserChannel(id!);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      telegramId: data?.telegramId ?? '',
      title: data?.title ?? '',
      categoryId: data?.categoryId ?? '',
      channelsToRewrite: Array.isArray(data?.channelsToRewrite)
        ? data.channelsToRewrite
        : [],
    },
    onSubmit: async (values) => {
      await updateMutation.mutateAsync({
        telegramId: values.telegramId,
        title: values.title,
        categoryId: values.categoryId,
        channelsToRewrite: normalizeChannels(values.channelsToRewrite),
      });

      navigate(RoutePath.UserChannelDetail.replace(':id', id as string));
    },
  });

  if (isLoading) return <div>Загрузка…</div>;

  return (
    <div>
      <Typography.Title level={3}>Редактирование канала</Typography.Title>

      <Card>
        <FormikProvider value={formik}>
          <Form layout="vertical" onFinish={formik.handleSubmit}>
            <Form.Item label="Название">
              <Input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item label="Telegram ID">
              <Input
                name="telegramId"
                value={formik.values.telegramId}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item label="Категория">
              <Input
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item label="Каналы для рерайта">
              <Select
                mode="tags"
                value={formik.values.channelsToRewrite}
                onChange={(v) => formik.setFieldValue('channelsToRewrite', v)}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form>
        </FormikProvider>
      </Card>
    </div>
  );
};
