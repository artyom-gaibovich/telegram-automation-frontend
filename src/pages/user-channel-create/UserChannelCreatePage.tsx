import React from 'react';
import { Card, Form, Input, Select, Typography } from 'antd';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useCategories } from '@entities/category/lib/useCategory';
import { useCreateUserChannel } from '@entities/user-channel';
import { normalizeChannels } from '@entities/user-channel/lib/util';
import { RoutePath } from '@shared/config/router';
import { Button } from '@shared/ui';

const { Title } = Typography;

const USER_ID = '00000000-0000-0000-0000-000000000000';

interface FormValues {
  telegramId: string;
  title: string;
  categoryId: string;
  channelsToRewrite: string[];
}

const validationSchema = Yup.object({
  title: Yup.string().required('Введите название'),
  telegramId: Yup.string().required('Введите Telegram ID'),
  categoryId: Yup.string().required('Выберите категорию'),
  channelsToRewrite: Yup.array()
    .of(Yup.string())
    .max(100, 'Максимум 100 каналов'),
});

export const UserChannelCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { query: categoryQuery } = useCategories();
  const createMutation = useCreateUserChannel();

  const categories = categoryQuery.data?.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  const formik = useFormik<FormValues>({
    initialValues: {
      telegramId: '',
      title: '',
      categoryId: '',
      channelsToRewrite: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        userId: USER_ID,
        telegramId: values.telegramId,
        title: values.title,
        categoryId: values.categoryId,
        channelsToRewrite: normalizeChannels(values.channelsToRewrite),
      };

      const result = await createMutation.mutateAsync(payload);

      if (result?.id) {
        navigate(RoutePath.UserChannelDetail.replace(':id', result.id));
      }
    },
  });

  return (
    <div>
      <Title level={3}>Создание канала</Title>

      <Card>
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Название"
            validateStatus={
              formik.touched.title && formik.errors.title ? 'error' : ''
            }
            help={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : ''
            }
          >
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Telegram ID"
            validateStatus={
              formik.touched.telegramId && formik.errors.telegramId
                ? 'error'
                : ''
            }
            help={
              formik.touched.telegramId && formik.errors.telegramId
                ? formik.errors.telegramId
                : ''
            }
          >
            <Input
              name="telegramId"
              value={formik.values.telegramId}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Категория"
            validateStatus={
              formik.touched.categoryId && formik.errors.categoryId
                ? 'error'
                : ''
            }
            help={
              formik.touched.categoryId && formik.errors.categoryId
                ? formik.errors.categoryId
                : ''
            }
          >
            <Select
              placeholder="Выберите категорию"
              value={formik.values.categoryId || undefined}
              onChange={(v) => formik.setFieldValue('categoryId', v)}
              onBlur={() => formik.setFieldTouched('categoryId')}
            >
              {categories?.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Каналы для рерайта">
            <Select
              mode="tags"
              placeholder="@channel1 @channel2"
              value={formik.values.channelsToRewrite}
              onChange={(v) => formik.setFieldValue('channelsToRewrite', v)}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Создать
          </Button>
        </Form>
      </Card>
    </div>
  );
};
