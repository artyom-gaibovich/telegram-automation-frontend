import type { Category } from '@entities/category/api/types';
import { ApiService } from '@shared/services';

const create = async (body: Category.Api.Create.Request.Body) => {
  const { data } = await ApiService().post<Category.Api.Create.Response.Data>(
    `/categories`,
    body,
  );
  return data;
};

const findAll = async () => {
  const { data } =
    await ApiService().get<Category.Api.FindAll.Response.Data>(`/categories`);
  return data;
};

const findOne = async (id: string) => {
  const { data } = await ApiService().get<Category.Api.FindOne.Response.Data>(
    `/categories/${id}`,
  );
  return data;
};

const update = async (id: string, body: Category.Api.Update.Request.Body) => {
  const { data } = await ApiService().patch<Category.Api.Update.Response.Data>(
    `/categories/${id}`,
    body,
  );
  return data;
};

const remove = async (id: string) => {
  const { data } = await ApiService().delete<Category.Api.Remove.Response.Data>(
    `/categories/${id}`,
  );
  return data;
};

export const categoryApi = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
