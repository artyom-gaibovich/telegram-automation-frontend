import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation, type UseQueryResult } from '@tanstack/react-query';
import { type CheckboxChangeEvent, Row } from 'antd';
import type { FilterValue } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { type Transcription, transcriptionApi } from '@entities/transcription';
import { RoutePath } from '@shared/config/router';
import type { IUsePagination } from '@shared/libs';
import { loadFiltersFromStorage, saveFiltersToStorage } from '@shared/services';
import { TranscriptionTableFilters } from '@shared/services/LocalStorageService';
import { Button, Checkbox } from '@shared/ui';
import { Table } from '@shared/ui/Table/Table';
import {
  EditableCell,
  EditableRow,
} from '@widgets/transcription-list/TranscriptionListTable/ui/EditableCell';

interface Props {
  query: UseQueryResult<Transcription.Api.FindAll.Response.Data>;
  pagination: IUsePagination['pagination'];
  onChangePagination: IUsePagination['onChangePagination'];
  queryRefetch: Dispatch<SetStateAction<number>>;
}

interface TableParams {
  filters?: Record<string, FilterValue | null>;
  sort?: {
    field?: string;
    order?: 'ascend' | 'descend';
  };
}

export const TranscriptionListTable = ({
  query,
  pagination,
  onChangePagination,
  queryRefetch,
}: Props) => {
  const [tableParams, setTableParams] = useState<TableParams>(() =>
    loadFiltersFromStorage(TranscriptionTableFilters),
  );
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate();

  const deleteFieldsMutation = useMutation({
    mutationFn: async (fieldIds: string[]) => {
      return Promise.allSettled(
        fieldIds.map((id: string) => transcriptionApi.remove(id)),
      );
    },
    onSuccess: () => {
      query.refetch();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    saveFiltersToStorage(tableParams, TranscriptionTableFilters);
  }, [tableParams]);

  const updateOrderMutation = useMutation({
    mutationFn: async ({
      id,
      order,
      section,
    }: {
      id: string;
      order: number;
      section: string;
    }) => {
      return transcriptionApi.updatePartial(id, { order, section });
    },

    onSuccess: () => query.refetch(),
  });

  const nameFilters = useMemo(() => {
    const names = [...new Set(query.data?.content.map((item) => item.code))];
    return names.map((name) => ({ text: name, value: name }));
  }, [query.data]);

  const filteredData = useMemo(() => {
    if (!query.data) return [];

    let data = [...query.data.content];

    if (tableParams.filters?.code) {
      data = data.filter((item) =>
        tableParams.filters!.code!.some((filterValue) =>
          item.code.includes(filterValue as string),
        ),
      );
    }

    if (!tableParams.sort) {
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }

    return data;
  }, [query.data, tableParams.filters, tableParams.sort]);

  const handleTableChange = (
    pagination: any,
    filters: Record<string, FilterValue | null>,
    sorter: any,
  ) => {
    setTableParams({
      filters,
      sort:
        sorter.field && sorter.order
          ? {
              field: sorter.field,
              order: sorter.order,
            }
          : undefined,
    });
  };

  const handleClickCreate = () => {
    navigate(RoutePath.TranscriptionUpload);
  };

  const handleClickDeleteSelected = () => {
    if (!selectedRows.length) return;

    deleteFieldsMutation.mutate(selectedRows, {
      onSuccess: () => {
        setSelectedRows([]);
      },
    });
  };

  const baseColumns: any[] = [
    {
      align: 'center',
      title: 'Наименование файла',
      dataIndex: 'fileName',
      onCell: (record: any) => ({
        onClick: () =>
          navigate(RoutePath.TranscriptionDetail.replace(':id', record.id)),
        style: { cursor: 'pointer', color: '#1890ff' },
      }),
    },
    {
      align: 'center',
      title: 'Код курса',
      dataIndex: 'code',
      filters: nameFilters,
      filteredValue: tableParams.filters?.code || null,
    },
    {
      align: 'center',
      title: 'Раздел курса',
      dataIndex: 'section',
      render: (value: any) => value ?? 'Не заполнено',
      editable: true,
    },
    {
      align: 'center',
      title: 'Порядок',
      dataIndex: 'order',
      editable: true,
    },
    {
      align: 'center',
      title: 'Выбрать для удаления',
      key: 'checkboxToDelete',
      render: (_value: any, record: any) => {
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
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => {
        if (!value) return 'Нет данных';
        return new Date(value).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
      sorter: (a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      },
      sortOrder:
        tableParams.sort?.field === 'createdAt' ? tableParams.sort.order : null,
      defaultSortOrder: 'descend',
    },
  ];

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

  const handleSave = (row: any) => {
    updateOrderMutation.mutate({
      id: row.id,
      order: Number(row.order),
      section: row.section,
    });
  };

  const columns = baseColumns.map((col) => {
    if (!col.editable) return col;

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      <Row justify="space-between">
        <Button
          onClick={handleClickCreate}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Загрузить транскрипцию
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

      <Table<Transcription.Item>
        rowKey={'id'}
        className={'mt-4'}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        pagination={{
          ...pagination,
          totalElements: filteredData.length ?? 0,
          onChange: (...args) => {
            onChangePagination(...args);
            queryRefetch((i) => i + 1);
          },
        }}
        rowClickable
        dataSource={filteredData}
        columns={columns}
        onChange={handleTableChange}
      />
    </>
  );
};
