import { useMemo, useState } from 'react';
import { useMutation, type UseQueryResult } from '@tanstack/react-query';
import { type CheckboxChangeEvent, Row } from 'antd';
import type { FilterValue } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { type Transcription, transcriptionApi } from '@entities/transcription';
import { RoutePath } from '@shared/config/router';
import type { IUsePagination } from '@shared/libs';
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
  queryRefetch: React.Dispatch<React.SetStateAction<number>>;
}

interface TableParams {
  filters?: Record<string, FilterValue | null>;
}

export const TranscriptionListTable = ({
  query,
  pagination,
  onChangePagination,
  queryRefetch,
}: Props) => {
  const [tableParams, setTableParams] = useState<TableParams>({});
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

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, order }: { id: string; order: number }) => {
      return transcriptionApi.updatePartial(id, { order });
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

    return data;
  }, [query.data, tableParams.filters]);

  const handleTableChange = (
    _: unknown,
    filters: Record<string, FilterValue | null>,
  ) => {
    setTableParams({ filters });
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
