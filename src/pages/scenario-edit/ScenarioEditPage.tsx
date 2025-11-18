import React, { useEffect } from 'react';
import { Card, Form, Typography, Input } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useScenarioDetail } from '@entities/scenario';
import { bem } from '@shared/libs';
import { Button } from '@shared/ui';

const b = bem('scenario-edit-page');

export const ScenarioEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, update } = useScenarioDetail(id!);

  const formik = useFormik({
    initialValues: {
      content: '',
      code: '',
      section: '',
      order: 0,
      tags: '' as string,
    },
    onSubmit: async (values) => {
      const dto = {
        content: values.content,
        code: values.code,
        section: values.section,
        order: Number(values.order),
        tags: values.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await update(dto);
      navigate(`/scenario/${id}`);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        content: data.content ?? '',
        code: data.code ?? '',
        section: data.section ?? '',
        order: data.order ?? 0,
        tags: data.tags.join(', '),
      });
    }
  }, [data]);

  return (
    <div className={b()}>
      <Typography.Title level={3} className={b('title')}>
        Редактировать сценарий
      </Typography.Title>

      {isLoading && <h2>Загрузка...</h2>}

      {!isLoading && (
        <Card>
          <FormikProvider value={formik}>
            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item label="Section">
                <Input
                  name="section"
                  value={formik.values.section}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item label="Code">
                <Input
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item label="Order">
                <Input
                  type="number"
                  name="order"
                  value={formik.values.order}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item label="Теги (через запятую)">
                <Input
                  name="tags"
                  value={formik.values.tags}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item label="Контент (Markdown)">
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
                Сохранить изменения
              </Button>
            </Form>
          </FormikProvider>
        </Card>
      )}
    </div>
  );
};
