import type { UserChannel } from '@entities/user-channel/api/types';
import { ApiService } from '@shared/services';

const create = async (body: UserChannel.Api.Create.Request.Body) => {
  const { data } =
    await ApiService().post<UserChannel.Api.Create.Response.Data>(
      `/user-channels`,
      body,
    );
  return data;
};

const findAllByUserId = async (userId: string) => {
  const { data } =
    await ApiService().get<UserChannel.Api.FindAllByUserId.Response.Data>(
      `/user-channels/${userId}`,
    );
  return data;
};

const update = async (
  id: string,
  body: UserChannel.Api.Update.Request.Body,
) => {
  const { data } =
    await ApiService().patch<UserChannel.Api.Update.Response.Data>(
      `/user-channels/${id}`,
      body,
    );
  return data;
};

const remove = async (id: string) => {
  const { data } =
    await ApiService().delete<UserChannel.Api.Remove.Response.Data>(
      `/user-channels/${id}`,
    );
  return data;
};

export const userChannelApi = {
  create,
  findAllByUserId,
  update,
  remove,
};
