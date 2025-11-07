import { useMemo, useState } from 'react';
import { useMutation, type UseQueryResult } from '@tanstack/react-query';
import { type CheckboxChangeEvent, Row } from 'antd';
import type { FilterValue } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { type Category, categoryApi } from '@entities/category';
import { RoutePath } from '@shared/config/router';
import type { IUsePagination } from '@shared/libs';
import { Button, Checkbox } from '@shared/ui';
import { Table } from '@shared/ui/Table/Table';

interface Props {
  query: UseQueryResult<Category.Api.FindAll.Response.Data>;
  pagination: IUsePagination['pagination'];
}

interface TableParams {
  filters?: Record<string, FilterValue | null>;
}

export const CategoryListTable = ({ query, pagination }: Props) => {
  const [tableParams, setTableParams] = useState<TableParams>({});
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate();

  const deleteFieldsMutation = useMutation({
    mutationFn: async (fieldIds: string[]) => {
      return Promise.allSettled(
        fieldIds.map((id: string) => categoryApi.remove(id)),
      );
    },
    onSuccess: () => {
      query.refetch();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const nameFilters = useMemo(() => {
    const names = [...new Set(query.data?.map((item) => item.name))];
    return names.map((name) => ({ text: name, value: name }));
  }, [query.data]);

  const filteredData = useMemo(() => {
    if (!query.data) return [];

    let data = [...query.data];

    if (tableParams.filters?.name) {
      data = data.filter((item) =>
        tableParams.filters!.name!.some((filterValue) =>
          item.name.includes(filterValue as string),
        ),
      );
    }

    return data;
  }, [query.data, tableParams.filters]);

  const handleTableChange = (
    _: unknown,
    filters: Record<string, FilterValue | null>,
  ) => {
    setTableParams({ filters });
  };

  const handleClickCreate = () => {
    navigate(RoutePath.CategoryCreate);
  };

  const handleClickDeleteSelected = () => {
    if (!selectedRows.length) return;

    deleteFieldsMutation.mutate(selectedRows, {
      onSuccess: () => {
        setSelectedRows([]);
      },
    });
  };

  const handleClickSelect = (e: CheckboxChangeEvent) => {
    const rowId = e.target.value;

    setSelectedRows((prevState) => {
      if (e.target.checked) {
        return prevState.concat(rowId);
      } else {
        return prevState.filter((i) => i !== rowId);
      }
    });
  };

  return (
    <>
      <Row justify="space-between">
        <Button
          onClick={handleClickCreate}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Добавить категорию
        </Button>

        <Button
          type="default"
          color={'orange'}
          disabled={!selectedRows.length}
          onClick={handleClickDeleteSelected}
        >
          Удалить
        </Button>
      </Row>

      <Table<Category.Item>
        rowKey={'id'}
        className={'mt-4'}
        pagination={pagination}
        rowClickable
        dataSource={filteredData}
        columns={[
          {
            align: 'center',
            title: 'Наименование',
            dataIndex: 'name',
            filters: nameFilters,
            filteredValue: tableParams.filters?.name || null,
          },
          {
            align: 'center',
            title: 'Выбрать для удаления',
            key: 'checkboxToDelete',
            render: (_value, record) => {
              return (
                <Checkbox
                  value={record.id}
                  checked={selectedRows.includes(record.id)}
                  onChange={handleClickSelect}
                />
              );
            },
          },

          {
            align: 'center',
            title: 'Промпт',
            dataIndex: 'prompt',
          },
          {
            align: 'center',
            title: 'Редактировать',
            dataIndex: 'prompt',
            render: (_value, record) => {
              return (
                <Button
                  type="primary"
                  color="geekblue"
                  onClick={() => {
                    if (record.id) {
                      navigate(
                        RoutePath.EditCategory.replace(':id', record.id),
                      );
                    }
                  }}
                >
                  Редактировать
                </Button>
              );
            },
          },
        ]}
        onChange={handleTableChange}
      />
    </>
  );
};
