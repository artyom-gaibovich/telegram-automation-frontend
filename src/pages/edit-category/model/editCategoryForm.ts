import type { Category } from '@entities/category';
import { Yup } from '@shared/libs';

export interface EditCategoryFormValues {
  id: string | undefined;
  name: string | undefined;
  prompt: string | undefined;
}

export const editCategoryForm: FormModel<
  EditCategoryFormValues,
  Category.Api.Update.Request.Body,
  Category.Api.FindOne.Response.Data
> = {
  initialValues: {
    id: undefined,
    name: undefined,
    prompt: undefined,
  },
  validationSchema: Yup.object({
    prompt: Yup.string().required('Обязателен'),
    name: Yup.string().required('Обязателен'),
  }),
  mapFromServer: (data) => data,
  mapToServer: (data) => data,
};
