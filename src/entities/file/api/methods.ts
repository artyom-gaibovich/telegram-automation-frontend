import type { FileStorage } from '@entities/file/api/types';
import type { Youtube } from '@entities/youtube';
import { ApiService } from '@shared/services';

const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const { data } = await ApiService().post<string>(`/file`, formData);
  return data;
};

const download = async (fileId: string, params?: { inline?: boolean }) => {
  const { data } = await ApiService().get<ArrayBuffer>(`/file/${fileId}`, {
    responseType: 'arraybuffer',
    params,
  });
  return data;
};

const uploadMultiple = async (
  files: File[],
  params: { code: string; seo_tags: string[] },
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file, file.name);
  });

  formData.append('code', params.code);
  params.seo_tags.forEach((tag) => {
    formData.append('seo_tags[]', tag);
  });

  const { data } =
    await ApiService().post<Youtube.Api.UploadMultiple.Response.Data>(
      `/youtube/upload-multiple`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  return data;
};

// todo: кэширование
const getInfo = async (fileId: string) => {
  const { data } = await ApiService().get<FileStorage.ItemInfo>(
    `/file/info/${fileId}`,
  );
  return data;
};

export const fileApi = {
  upload,
  uploadMultiple,
  download,
  getInfo,
};
