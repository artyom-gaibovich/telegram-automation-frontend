import './CreateCategoryPage.scss';
import { useMutation } from '@tanstack/react-query';
import { Form } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { categoryApi } from '@entities/category';
import { RoutePath } from '@shared/config/router';
import { bem } from '@shared/libs';
import { Button, Input } from '@shared/ui';
import { FormInputTextarea } from '@shared/ui/form-controls';

const b = bem('create-category-page');

const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const categoryCreateMutation = useMutation({
    mutationFn: categoryApi.create,
    onSuccess: (data) => {
      console.log('Created:', data);
      navigate(RoutePath.CategoryList);
    },
    onError: (error) => {
      console.error('Created failed:', error);
    },
  });
  const formik = useFormik({
    initialValues: {
      prompt: '',
      name: '',
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required('Обязателен'),
      name: Yup.string().required('Обязателен'),
    }),

    onSubmit: (values) => {
      categoryCreateMutation.mutate(values);
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
            disabled={categoryCreateMutation.isPending}
            onClick={() => {
              navigate(RoutePath.CategoryList);
            }}
          >
            Назад
          </Button>
          <div className={b('container')}>
            <div>
              <label htmlFor="name">Наименование категории</label>

              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="prompt">Промпт</label>

              <FormInputTextarea
                id="prompt"
                name="prompt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.prompt}
              />
              {formik.touched.prompt && formik.errors.prompt ? (
                <div>{formik.errors.prompt}</div>
              ) : null}
            </div>
          </div>

          <Button
            variant="solid"
            color="primary"
            className="mt-5"
            disabled={categoryCreateMutation.isPending}
            onClick={() => {
              formik.submitForm();
            }}
          >
            Создать
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default CreateCategoryPage;
