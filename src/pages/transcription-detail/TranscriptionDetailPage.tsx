import React, { useState } from 'react';
import {
  ArrowLeftOutlined,
  CopyOutlined,
  SendOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Form,
  InputNumber,
  message,
  Select,
  Typography,
} from 'antd';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useCategories } from '@entities/category/lib/useCategory';
import {
  transcriptionApi,
  useTranscriptionDetail,
} from '@entities/transcription';
import { RoutePath } from '@shared/config/router';

const { Title } = Typography;

interface PromptFormValues {
  transcriptionId: string;
  categoryId: string;
  language: string;
  topic_tags: string[];
  audience_level: string;
  variants: number;
}

const validationSchema = Yup.object({
  categoryId: Yup.string().required('Выберите категорию'),
  topic_tags: Yup.array()
    .of(Yup.string())
    .min(1, 'Добавьте хотя бы один тег')
    .required('Теги обязательны'),
  audience_level: Yup.string().required('Выберите уровень аудитории'),
  variants: Yup.number()
    .min(1, 'Минимум 1 вариант')
    .max(10, 'Максимум 10 вариантов')
    .required('Укажите количество вариантов'),
});

const TranscriptionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [promptResponse, setPromptResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { query: transcriptionQuery } = useTranscriptionDetail(id!);
  const { query: categoryQuery } = useCategories();

  const categories = categoryQuery?.data?.map((el) => ({
    id: el.id,
    name: el.name,
  }));

  const formik = useFormik<PromptFormValues>({
    initialValues: {
      transcriptionId: id || '',
      categoryId: '',
      language: 'ru',
      topic_tags: [],
      audience_level: 'beginner',
      variants: 1,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await transcriptionApi.generatePrompt(values);
        setPromptResponse(response.message);
        message.success('Промпт успешно получен!');
      } catch (error) {
        message.error('Ошибка при получении промпта');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCopyPrompt = () => {
    if (promptResponse) {
      navigator.clipboard.writeText(promptResponse);
      message.success('Промпт скопирован в буфер обмена');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(RoutePath.TranscriptionList)}
        style={{ marginBottom: '24px' }}
      >
        Назад к списку
      </Button>

      <Card style={{ marginBottom: '24px' }}>
        <Title level={2}>{transcriptionQuery.data?.fileName}</Title>
      </Card>

      <Card title="Генерация промпта" style={{ marginBottom: '24px' }}>
        <Form layout="vertical" onFinish={formik.handleSubmit}>
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
              onChange={(value) => formik.setFieldValue('categoryId', value)}
              onBlur={() => formik.setFieldTouched('categoryId')}
              size="large"
            >
              {categories?.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Теги темы"
            validateStatus={
              formik.touched.topic_tags && formik.errors.topic_tags
                ? 'error'
                : ''
            }
            help={
              formik.touched.topic_tags && formik.errors.topic_tags
                ? formik.errors.topic_tags
                : ''
            }
          >
            <Select
              mode="tags"
              placeholder="Введите теги (например: Linux, DevOps)"
              value={formik.values.topic_tags}
              onChange={(value) => formik.setFieldValue('topic_tags', value)}
              onBlur={() => formik.setFieldTouched('topic_tags')}
              size="large"
            ></Select>
          </Form.Item>

          <Form.Item label="Уровень аудитории">
            <Select
              value={formik.values.audience_level}
              onChange={(value) =>
                formik.setFieldValue('audience_level', value)
              }
              size="large"
            >
              <Select.Option value="beginner">Начинающий</Select.Option>
              <Select.Option value="intermediate">Средний</Select.Option>
              <Select.Option value="advanced">Продвинутый</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Количество вариантов"
            validateStatus={
              formik.touched.variants && formik.errors.variants ? 'error' : ''
            }
            help={
              formik.touched.variants && formik.errors.variants
                ? formik.errors.variants
                : ''
            }
          >
            <InputNumber
              min={1}
              max={10}
              value={formik.values.variants}
              onChange={(value) => formik.setFieldValue('variants', value || 1)}
              style={{ width: '100%' }}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={loading}
              size="large"
              block
            >
              Получить промпт
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {promptResponse && (
        <Card
          title="Сгенерированный промпт"
          extra={
            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={handleCopyPrompt}
            >
              Копировать
            </Button>
          }
          style={{ marginBottom: '24px' }}
        >
          <Alert
            message={promptResponse}
            type="success"
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: '15px',
              lineHeight: '1.6',
            }}
          />
        </Card>
      )}
    </div>
  );
};

export default TranscriptionDetailPage;
