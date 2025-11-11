import { useState } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type Transcription, transcriptionApi } from '@entities/transcription';
import { type IUsePagination, usePagination } from '@shared/libs';

export interface IUseTranscription {
  query: UseQueryResult<Transcription.Api.FindAll.Response.Data>;
  pagination: IUsePagination['pagination'];
  onChangePagination: IUsePagination['onChangePagination'];
  queryRefetch: () => void;
}

export function useTranscription(): IUseTranscription {
  const [refetch, setRefetch] = useState<number>(0);

  const queryRefetch = () => {
    setRefetch((i) => i + 1);
  };
  const query = useQuery<Transcription.Api.FindAll.Response.Data>({
    queryKey: ['transcription', refetch],
    retry: 1,
    queryFn: () => transcriptionApi.findAll(),
  });
  const { pagination, onChangePagination } = usePagination();

  return {
    pagination,
    onChangePagination,
    query,
    queryRefetch,
  };
}
