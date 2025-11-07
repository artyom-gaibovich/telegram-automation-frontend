import './EditCategoryPage.scss';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Row } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { type Category, categoryApi } from '@entities/category';
import { editCategoryForm } from '@pages/edit-category/model/editCategoryForm';
import { RoutePath } from '@shared/config/router';
import { bem } from '@shared/libs';
import { Button, Input } from '@shared/ui';
import { FormInputTextarea } from '@shared/ui/form-controls';

const b = bem('edit-category-page');

const EditCategoryPage = () => {
  const navigate = useNavigate();

  const { id: categoryId } = useParams();
  const categoryEditMutation = useMutation({
    mutationFn: (body: Category.Api.Update.Request.Body) =>
      categoryApi.update(categoryId!, body),
    onSuccess: (data) => {
      console.log('Created:', data);
      navigate(RoutePath.CategoryList);
    },
    onError: (error) => {
      console.error('Created failed:', error);
    },
  });

  const query = useQuery<Category.Api.FindOne.Response.Data>({
    queryKey: ['category', categoryId],
    retry: false,
    refetchOnMount: false,
    enabled: !!categoryId,
    queryFn: () => {
      return categoryApi.findOne(categoryId!);
    },
  });

  const onDataLoaded = (
    data: Category.Api.FindOne.Response.Data | undefined,
  ) => {
    if (!data) {
      formik.resetForm({
        values: {
          ...editCategoryForm.initialValues,
        },
      });

      return;
    }
    const newValues = editCategoryForm.mapFromServer!(data);
    formik.resetForm({ values: newValues });
  };

  useEffect(() => {
    if (query.isLoading) {
      return;
    }
    if (query.isEnabled && !query.isFetched) {
      return;
    }

    onDataLoaded(query.data);
  }, [query.data]);

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
      categoryEditMutation.mutate(values);
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
            disabled={categoryEditMutation.isPending}
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
                rows={30}
              />
              {formik.touched.prompt && formik.errors.prompt ? (
                <div>{formik.errors.prompt}</div>
              ) : null}
            </div>
          </div>

          <Row justify="space-between">
            <Button
              variant="solid"
              color="primary"
              className="mt-5"
              disabled={categoryEditMutation.isPending}
              onClick={() => {
                formik.submitForm();
              }}
            >
              Сохранить
            </Button>
            <Button
              variant="solid"
              color="danger"
              className="mt-5"
              disabled={categoryEditMutation.isPending}
              onClick={() => {
                //удаление
              }}
            >
              Удалить
            </Button>
          </Row>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default EditCategoryPage;
