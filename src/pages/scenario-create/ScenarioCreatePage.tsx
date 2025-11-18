import React from 'react';
import { Card, Form, Typography, Input } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { scenarioApi } from '@entities/scenario';
import { bem } from '@shared/libs';
import { Button } from '@shared/ui';

const b = bem('scenario-create-page');

export const ScenarioCreatePage: React.FC = () => {
  const navigate = useNavigate();

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
        order: values.order,
        tags: values.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const newItem = await scenarioApi.create(dto);

      if (newItem?.id) {
        navigate(`/scenario/${newItem.id}`);
      }
    },
  });

  return (
    <div className={b()}>
      <Typography.Title level={3} className={b('title')}>
        Создать сценарий
      </Typography.Title>

      <Card>
        <FormikProvider value={formik}>
          <Form layout="vertical" onFinish={formik.handleSubmit}>
            <Form.Item label="Наименование">
              <Input
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item label="Раздел">
              <Input
                name="section"
                value={formik.values.section}
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

            <Form.Item label="Теги (через запятую)">
              <Input
                name="tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                placeholder="tag1, tag2, tag3"
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
              Создать
            </Button>
          </Form>
        </FormikProvider>
      </Card>
    </div>
  );
};
