import React, { useEffect } from 'react';
import { Card, Form, Typography, Input, Select } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import ReactMarkdown from 'react-markdown';
import { bem } from '@shared/libs';
import { Button } from '@shared/ui';
import { useParams } from 'react-router-dom';
import { useScenarioDetail } from '@entities/scenario';
import './ScenarioPage.scss';
import { CodeBlock } from '@pages/scenario-detail/ui/CodeBlock';

const { Title } = Typography;

const b = bem('scenario-page');

export const ScenarioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, update } = useScenarioDetail(id!);

  const formik = useFormik({
    initialValues: {
      content: '',
      code: '',
      section: '',
      order: 0,
      tags: [] as string[],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await update(values);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        content: data.content ?? '',
        code: data.code ?? '',
        section: data.section ?? '',
        order: data.order ?? 0,
        tags: data.tags,
      });
    }
  }, [data]);

  return (
    <div className={b()}>
      <Typography.Title level={3} className={b('title')}>
        Сценарий
      </Typography.Title>

      {isLoading && <h1>Загрузка...</h1>}

      {!isLoading && data && (
        <>
          <Card style={{ marginBottom: '24px' }}>
            <Title level={2}>{data?.code}</Title>
          </Card>
          <Card>
            <FormikProvider value={formik}>
              <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Form.Item label="Раздел">
                  <Input
                    name="section"
                    value={formik.values.section}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Form.Item label="Наименование">
                  <Input
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Form.Item label="Порядок">
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
                    placeholder="Введите теги (например: Linux, DevOps)"
                    value={formik.values.tags}
                    onChange={(value) => formik.setFieldValue('tags', value)}
                    onBlur={() => formik.setFieldTouched('tags')}
                    size="large"
                  ></Select>
                </Form.Item>

                <Form.Item label="Сценарий (Markdown)">
                  <Input.TextArea
                    rows={12}
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Button
                  variant="solid"
                  color="primary"
                  className="mt-5"
                  htmlType="submit"
                >
                  Сохранить
                </Button>
              </Form>
            </FormikProvider>
            {formik.values.content && (
              <Card className={b('card')}>
                <ReactMarkdown
                  components={{
                    code({ className, children }): any {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <CodeBlock
                          language={match[1]}
                          value={String(children)}
                        />
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
                        <Typography.Title
                          level={3}
                          className={b('markdown-h3')}
                        >
                          {children}
                        </Typography.Title>
                      );
                    },
                    h1({ children }) {
                      return (
                        <Typography.Title
                          level={3}
                          className={b('markdown-h3')}
                        >
                          {children}
                        </Typography.Title>
                      );
                    },
                  }}
                >
                  {formik.values.content}
                </ReactMarkdown>
              </Card>
            )}
          </Card>
        </>
      )}
    </div>
  );
};
