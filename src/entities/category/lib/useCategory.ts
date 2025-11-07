import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type Category, categoryApi } from '@entities/category';
import { type IUsePagination, usePagination } from '@shared/libs';

export interface IUseCategories {
  query: UseQueryResult<Category.Api.FindAll.Response.Data>;
  pagination: IUsePagination['pagination'];
  onChangePagination: IUsePagination['onChangePagination'];
}

export function useCategories(): IUseCategories {
  const query = useQuery<Category.Api.FindAll.Response.Data>({
    queryKey: ['category'],
    retry: 1,
    queryFn: () => categoryApi.findAll(),
  });
  const { pagination, onChangePagination } = usePagination();

  return {
    pagination,
    onChangePagination,
    query,
  };
}
