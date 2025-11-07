 export declare namespace Pagination {
  interface Params {
    page: number;
    size: number;
    sort?: string;
  }

  interface TableParams extends Omit<Params, 'sort'> {
    totalElements: number;
    onChange: (
      page: number | undefined,
      size: number | undefined,
      sort: string | undefined,
    ) => void;
  }

  interface Data<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    empty: boolean;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      unsorted: boolean;
      empty: boolean;
      sorted: boolean;
    };
    pageable: {
      unpaged: boolean;
      offset: number;
      sort: {
        unsorted: boolean;
        empty: boolean;
        sorted: boolean;
      };
      paged: boolean;
      pageNumber: number;
      pageSize: number;
    };
  }
}
