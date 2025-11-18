import React from 'react';
import { Typography, Card, Form, Input, Button, Select } from 'antd';
import { useFormik, FormikProvider } from 'formik';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useScenarioDetail } from '@entities/scenario';
import { CodeBlock } from '@pages/scenario-detail/ui/CodeBlock';
import { RoutePath } from '@shared/config/router';
import { bem, useAntdApp } from '@shared/libs';
import './ScenarioPage.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';

const b = bem('scenario-page');

const { Title } = Typography;

interface ScenarioFormValues {
  content: string;
  code: string;
  section: string;
  order: number;
  tags: string[];
}

const validationSchema = Yup.object({
  code: Yup.string().required('Введите наименование'),
  section: Yup.string().required('Введите раздел'),
  order: Yup.number().required('Введите порядок'),
  tags: Yup.array().of(Yup.string()).required('Добавьте хотя бы один тег'),
  content: Yup.string().required('Введите контент сценария'),
});

export const ScenarioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, update } = useScenarioDetail(id!);
  const { notification } = useAntdApp();

  const formik = useFormik<ScenarioFormValues>({
    initialValues: {
      content: data?.content ?? '',
      code: data?.code ?? '',
      section: data?.section ?? '',
      order: data?.order ?? 0,
      tags: data?.tags ?? [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const result = await update(values);
      if (result.id) {
        notification.success({
          message: 'Сценарий успешно сохранен',
        });
      }
    },
  });

  return (
    <div style={{ padding: '1px', maxWidth: 1200, margin: '0 auto' }}>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(RoutePath.ScenarioList)}
        style={{ marginBottom: '24px' }}
      >
        Назад к списку
      </Button>
      <Title level={3} style={{ marginBottom: 24 }}>
        Сценарий
      </Title>

      {isLoading && <h2>Загрузка…</h2>}

      {!isLoading && data && (
        <>
          <Card style={{ marginBottom: 24 }}>
            <Title
              level={2}
            >{`${formik.values.code} #${formik.values.tags.join(' #')}`}</Title>
          </Card>

          <Card title="Редактирование сценария" style={{ marginBottom: 24 }}>
            <FormikProvider value={formik}>
              <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Form.Item
                  label="Раздел"
                  validateStatus={
                    formik.touched.section && formik.errors.section
                      ? 'error'
                      : ''
                  }
                  help={
                    formik.touched.section && formik.errors.section
                      ? formik.errors.section
                      : ''
                  }
                >
                  <Input
                    name="section"
                    value={formik.values.section}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Наименование"
                  validateStatus={
                    formik.touched.code && formik.errors.code ? 'error' : ''
                  }
                  help={
                    formik.touched.code && formik.errors.code
                      ? formik.errors.code
                      : ''
                  }
                >
                  <Input
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Порядок"
                  validateStatus={
                    formik.touched.order && formik.errors.order ? 'error' : ''
                  }
                  help={
                    formik.touched.order && formik.errors.order
                      ? formik.errors.order
                      : ''
                  }
                >
                  <Input
                    type="number"
                    name="order"
                    value={formik.values.order}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Теги темы"
                  validateStatus={
                    formik.touched.tags && formik.errors.tags ? 'error' : ''
                  }
                  help={
                    formik.touched.tags && formik.errors.tags
                      ? formik.errors.tags
                      : ''
                  }
                >
                  <Select
                    mode="tags"
                    placeholder="Введите теги"
                    value={formik.values.tags}
                    onChange={(value) => formik.setFieldValue('tags', value)}
                    onBlur={() => formik.setFieldTouched('tags')}
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="Сценарий (Markdown)"
                  validateStatus={
                    formik.touched.content && formik.errors.content
                      ? 'error'
                      : ''
                  }
                  help={
                    formik.touched.content && formik.errors.content
                      ? formik.errors.content
                      : ''
                  }
                >
                  <Input.TextArea
                    name="content"
                    rows={12}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Сохранить
                  </Button>
                </Form.Item>
              </Form>
            </FormikProvider>
          </Card>

          {formik.values.content && (
            <ReactMarkdown
              components={{
                code({ className, children }): any {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <CodeBlock language={match[1]} value={String(children)} />
                  ) : (
                    <code style={{ color: '#D33C44' }}>{children}</code>
                  );
                },
                p({ children }) {
                  return (
                    <Typography className={b('markdown-p')}>
                      {children}
                    </Typography>
                  );
                },
                hr() {
                  return <div></div>;
                },
                h2({ children }) {
                  return (
                    <Typography.Title level={3} className={b('markdown-h3')}>
                      {children}
                    </Typography.Title>
                  );
                },
                h1({ children }) {
                  return (
                    <Typography.Title level={3} className={b('markdown-h3')}>
                      {children}
                    </Typography.Title>
                  );
                },
              }}
            >
              {formik.values.content}
            </ReactMarkdown>
          )}
        </>
      )}
    </div>
  );
};
