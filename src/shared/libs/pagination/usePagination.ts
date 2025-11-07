import { useState } from 'react';
import { DEFAULT_PAGINATION } from '@shared/libs/pagination/constants';
import type { Pagination } from '@shared/libs/pagination/types';

export interface IUsePagination {
  pagination: Pagination.Params;
  setPagination: React.Dispatch<React.SetStateAction<Pagination.Params>>;
  resetPagination: () => void;
  onChangePagination: Pagination.TableParams['onChange'];
}

export const usePagination = (
  initialState: Pagination.Params = DEFAULT_PAGINATION,
): IUsePagination => {
  const [pagination, setPagination] = useState<Pagination.Params>(initialState);

  const resetPagination = () => {
    setPagination(initialState);
  };

  const onChangePagination: Pagination.TableParams['onChange'] = (
    page,
    size,
    sort,
  ) => {
    setPagination((prevState) => {
      const newState = { ...prevState };

      if (page) {
        newState.page = page - 1;
      }
      if (size) {
        newState.size = size;
      }
      if (sort || newState.sort) {
        newState.sort = sort;
      }

      return newState;
    });
  };

  return { pagination, setPagination, resetPagination, onChangePagination };
};
