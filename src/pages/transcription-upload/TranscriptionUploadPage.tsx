import './TranscriptionUploadPage.scss';
import { useMutation } from '@tanstack/react-query';
import { Form, Select } from 'antd';
import type { UploadFile } from 'antd/lib';
import { FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { fileApi } from '@entities/file';
import { RoutePath } from '@shared/config/router';
import { bem } from '@shared/libs';
import { Button, Input } from '@shared/ui';
import { FormFileUpload } from '@shared/ui/form-controls/FormFileUpload';

const b = bem('create-category-page');

const TranscriptionUploadPage = () => {
  const navigate = useNavigate();
  const fileUploadMutation = useMutation({
    mutationFn: ({
      files,
      code,
      seo_tags,
    }: {
      files: File[];
      code: string;
      seo_tags: string[];
    }) => fileApi.uploadMultiple(files, { code, seo_tags }),
    onSuccess: (data) => {
      console.log('Files uploaded:', data);
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    },
  });

  const formik = useFormik({
    initialValues: {
      code: '',
      files: [] as UploadFile[],
      seo_tags: [],
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Обязателен'),
      files: Yup.array()
        .min(1, 'Хотя бы один файл должен быть выбран')
        .required('Файлы обязательны'),
      seo_tags: Yup.array()
        .of(Yup.string())
        .min(1, 'Добавьте хотя бы один тег')
        .required('Теги обязательны'),
    }),
    onSubmit: (values) => {
      const files = values.files
        .map((file) => file.originFileObj)
        .filter((file) => file !== undefined);

      fileUploadMutation.mutate({
        files,
        code: values.code,
        seo_tags: values.seo_tags,
      });
    },
  });

  return (
    <div className={b()}>
      <FormikProvider value={formik}>
        <Form layout="vertical">
          <Button
            variant="filled"
            color="default"
            className="mt-5"
            disabled={fileUploadMutation.isPending}
            onClick={() => {
              navigate(RoutePath.TranscriptionList);
            }}
          >
            Назад
          </Button>
          <div className={b('container')}>
            <div>
              <label htmlFor="name">Код курса</label>

              <Input
                id="code"
                name="code"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
              />
              {formik.touched.code && formik.errors.code ? (
                <div>{formik.errors.code}</div>
              ) : null}

              <Form.Item
                label="Теги темы"
                validateStatus={
                  formik.touched.seo_tags && formik.errors.seo_tags
                    ? 'error'
                    : ''
                }
                help={
                  formik.touched.seo_tags && formik.errors.seo_tags
                    ? formik.errors.seo_tags
                    : ''
                }
              >
                <Select
                  mode="tags"
                  placeholder="Введите теги (например: Linux, DevOps)"
                  value={formik.values.seo_tags}
                  onChange={(value) => formik.setFieldValue('seo_tags', value)}
                  onBlur={() => formik.setFieldTouched('seo_tags')}
                  size="large"
                ></Select>
              </Form.Item>
            </div>
            <FormFileUpload
              multiple
              className={'mt-4'}
              name={'files'}
              allowedExtensions={['.mp4']}
            />
          </div>

          <Button
            variant="solid"
            color="primary"
            className="mt-5"
            disabled={fileUploadMutation.isPending}
            onClick={() => {
              formik.submitForm();
            }}
          >
            Загрузить
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default TranscriptionUploadPage;
