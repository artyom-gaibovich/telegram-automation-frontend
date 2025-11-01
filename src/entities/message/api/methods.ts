import type { Message } from '@entities/message';
import { ApiService } from '@shared/services';

const rewriteContent = async (body: Message.Api.Rewrite.Request.Body) => {
  const { data } = await ApiService().post<Message.Api.Rewrite.Response.Data>(
    `/messages/rewrite`,
    body,
  );
  return data;
};

export const messageApi = {
  rewriteContent,
};
