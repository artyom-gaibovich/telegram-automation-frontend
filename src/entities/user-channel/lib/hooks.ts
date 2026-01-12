import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userChannelApi } from '../api/methods';
import type { UserChannel } from '../api/types';

const USER_ID = 'USER_ID_1';

export const useUserChannelsList = () => {
  return useQuery({
    queryKey: ['user-channels', USER_ID],
    queryFn: () => userChannelApi.findAllByUserId(USER_ID),
  });
};

export const useUserChannelDetail = (id: string) => {
  return useQuery({
    queryKey: ['user-channel', id],
    queryFn: async () => {
      const list = await userChannelApi.findAllByUserId(USER_ID);
      return list.find((i) => i.id === id);
    },
    enabled: !!id,
  });
};

export const useCreateUserChannel = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: UserChannel.Api.Create.Request.Body) =>
      userChannelApi.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-channels'] });
    },
  });
};

export const useUpdateUserChannel = (id: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: UserChannel.Api.Update.Request.Body) =>
      userChannelApi.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-channels'] });
      qc.invalidateQueries({ queryKey: ['user-channel', id] });
    },
  });
};

export const useRemoveUserChannel = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userChannelApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-channels'] });
    },
  });
};
