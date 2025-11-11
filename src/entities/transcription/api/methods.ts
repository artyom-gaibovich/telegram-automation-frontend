import type { Transcription } from '@entities/transcription';
import { ApiService } from '@shared/services';

const findAll = async () => {
  const { data } =
    await ApiService().post<Transcription.Api.FindAll.Response.Data>(
      `/transcription/list`,
    );
  return data;
};

const remove = async (id: string) => {
  const { data } =
    await ApiService().delete<Transcription.Api.Remove.Response.Data>(
      `/transcription/${id}`,
    );
  return data;
};

export const transcriptionApi = {
  findAll,
  remove,
};
