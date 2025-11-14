import type { Transcription } from '@entities/transcription';
import { ApiService } from '@shared/services';

const findAll = async () => {
  const { data } =
    await ApiService().post<Transcription.Api.FindAll.Response.Data>(
      `/transcription/list`,
    );
  return data;
};

const findOne = async (id: string) => {
  const { data } =
    await ApiService().get<Transcription.Api.FindOne.Response.Data>(
      `/transcription/${id}`,
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

const updatePartial = async (
  id: string,
  dto: Partial<{ fileName: string; code: string; order: number }>,
) => {
  const { data } = await ApiService().patch(`/transcription/${id}`, dto);
  return data;
};

const generatePrompt = async (
  payload: Transcription.Api.GeneratePrompt.Request.Data,
) => {
  const { data } =
    await ApiService().post<Transcription.Api.GeneratePrompt.Response.Data>(
      `/transcription`,
      payload,
    );
  return data;
};

export const transcriptionApi = {
  findAll,
  remove,
  findOne,
  generatePrompt,
  updatePartial,
};
