import './Table.scss';
import { Table as AntTable, type TableProps as AntTableProps } from 'antd';
import type { SorterResult } from 'antd/lib/table/interface';
import { ORDER_DIRECTION } from '@shared/libs';
import bem from '@shared/libs/bem';
import type { Pagination } from '@shared/libs/pagination/types';

const b = bem('table');

export interface TableProps<T>
  extends Omit<AntTableProps<T>, 'className' | 'rootClassName' | 'pagination'> {
  className?: string;
  pagination?: Pagination.TableParams;
  paginationInternal?: AntTableProps['pagination'];
  rowClickable?: boolean;
}

export function Table<T extends Record<PropertyKey, any> = any>({
  className,
  pagination,
  paginationInternal,
  rowClickable,
  ...props
}: TableProps<T>) {
  return (
    <AntTable<T>
      rootClassName={b({ 'row-clickable': rowClickable }, [className])}
      bordered
      {...props}
      pagination={
        paginationInternal ||
        (pagination
          ? {
              current: pagination.page + 1,
              pageSize: pagination.size,
              total: pagination.totalElements,
            }
          : false)
      }
      onChange={(paginationArg, filters, sorter, extra) => {
        if (pagination?.onChange) {
          let sortString;

          const sorterSingle = sorter as SorterResult<T>;
          if (sorterSingle satisfies SorterResult<T>) {
            const { field, order } = sorterSingle;

            sortString =
              field && order ? `${field},${ORDER_DIRECTION[order]}` : undefined;
          }

          pagination.onChange(
            paginationArg?.current,
            paginationArg?.pageSize,
            sortString,
          );
        }

        props.onChange?.(paginationArg, filters, sorter, extra);
      }}
    />
  );
}
