import type { Pagination } from './types';

export const DEFAULT_PAGINATION: Pagination.Params = Object.freeze({
  page: 0,
  size: 10,
});

export const ORDER_DIRECTION = Object.freeze({
  ascend: 'asc',
  descend: 'desc',
});
