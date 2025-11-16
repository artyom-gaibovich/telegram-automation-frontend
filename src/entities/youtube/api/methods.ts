import type { Youtube } from '@entities/youtube/api/types';
import { ApiService } from '@shared/services';

const getComments = async (body: Youtube.Api.GetComments.Request.Body) => {
  const { data } =
    await ApiService().post<Youtube.Api.GetComments.Response.Data>(
      `/youtube`,
      body,
    );
  return data;
};

const uploadFile = async (
  file: File,
  params: Youtube.Api.Upload.Request.Params,
) => {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('categoryId', params.categoryId);
  formData.append('code', params.code);

  const { data } = await ApiService().post<Youtube.Api.Upload.Response.Data>(
    `/youtube/upload`,
    formData,
  );
  return data;
};

const uploadMultiple = async (
  files: File[],
  params: Youtube.Api.UploadMultiple.Request.Params,
) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file, file.name);
  }
  formData.append('categoryId', params.categoryId);
  formData.append('code', params.code);

  const { data } =
    await ApiService().post<Youtube.Api.UploadMultiple.Response.Data>(
      `/youtube/upload-multiple`,
      formData,
    );
  return data;
};

export const youtubeApi = {
  getComments,
  uploadFile,
  uploadMultiple,
};
