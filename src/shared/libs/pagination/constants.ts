import type { Pagination } from './types';

export const DEFAULT_PAGINATION: Pagination.Params = {
  page: 0,
  size: 100,
};

export const ORDER_DIRECTION = Object.freeze({
  ascend: 'asc',
  descend: 'desc',
});
