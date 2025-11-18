import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Checkbox, Row } from 'antd';
import type { FilterValue } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { type Scenario, scenarioApi } from '@entities/scenario';
import { RoutePath } from '@shared/config/router';
import type { IUsePagination } from '@shared/libs';
import { Button } from '@shared/ui';
import { Table } from '@shared/ui/Table/Table';
import {
  EditableCell,
  EditableRow,
} from '@widgets/transcription-list/TranscriptionListTable/ui/EditableCell';

interface Props {
  query: any; // UseQueryResult<ScenarioApi.Api.GetScenarioList.Response.Data>
  pagination: IUsePagination['pagination'];
  onChangePagination: IUsePagination['onChangePagination'];
}

interface TableParams {
  filters?: Record<string, FilterValue | null>;
}

export const ScenarioListTable = ({
  query,
  pagination,
  onChangePagination,
}: Props) => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({});

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) =>
      Promise.allSettled(ids.map((id) => scenarioApi.remove(id))),
    onSuccess: () => query.refetch(),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      order,
      section,
    }: {
      id: string;
      order: number;
      section: string;
    }) => scenarioApi.update(id, { order, section }),
    onSuccess: () => query.refetch(),
  });

  const sectionFilters = useMemo(() => {
    const items = query.data?.content ?? [];
    const sections = [
      ...new Set(
        items.map((i: { section: string }) => i.section).filter(Boolean),
      ),
    ];

    return sections.map((s) => ({
      text: s,
      value: s,
    }));
  }, [query.data]);

  const filteredData = useMemo(() => {
    if (!query.data) return [];

    let data = [...query.data.content];

    if (tableParams.filters?.code) {
      data = data.filter((item) =>
        tableParams.filters!.code!.some((value) =>
          item.code?.includes(value as string),
        ),
      );
    }

    if (tableParams.filters?.section) {
      data = data.filter((item) =>
        tableParams.filters!.section!.some((value) => item.section === value),
      );
    }

    return data;
  }, [tableParams.filters, query.data]);

  const handleTableChange = (_: any, filters: any) => {
    setTableParams({ filters });
  };

  const handleClickSelect = (e: any) => {
    const id = e.target.value;

    setSelectedRows((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
  };

  const handleDeleteSelected = () => {
    if (!selectedRows.length) return;

    deleteMutation.mutate(selectedRows, {
      onSuccess: () => {
        setSelectedRows([]);
      },
    });
  };

  const handleSave = (row: any) => {
    updateMutation.mutate({
      id: row.id,
      order: Number(row.order),
      section: row.section,
    });
  };

  const baseColumns: any[] = [
    {
      align: 'center',
      title: 'Наименование',
      dataIndex: 'code',
      onCell: (record: any) => ({
        onClick: () =>
          navigate(RoutePath.ScenarioDetail.replace(':id', record.id)),
        style: { cursor: 'pointer', color: '#1890ff' },
      }),
    },
    {
      align: 'center',
      title: 'Раздел',
      dataIndex: 'section',
      filters: sectionFilters,
      filteredValue: tableParams.filters?.section || null,
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
      title: 'Теги',
      dataIndex: 'tags',
      render: (tags: string[]) => tags.join(', '),
    },
    {
      align: 'center',
      title: 'Выбрать',
      key: 'checkbox',
      render: (_value: any, record: any) => (
        <Checkbox
          value={record.id}
          checked={selectedRows.includes(record.id)}
          onChange={handleClickSelect}
        />
      ),
    },
  ];

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
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Button
          onClick={() => navigate(RoutePath.ScenarioCreate)}
          type="primary"
        >
          Создать сценарий
        </Button>

        <Button
          disabled={!selectedRows.length}
          onClick={handleDeleteSelected}
          color="orange"
        >
          Удалить выбранные
        </Button>
      </Row>

      <Table<Scenario.Item>
        rowKey="id"
        className="mt-4"
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        pagination={{
          ...pagination,
          totalElements: filteredData.length,
          onChange: (...args) => {
            onChangePagination(...args);
          },
        }}
        dataSource={filteredData}
        columns={columns}
        onChange={handleTableChange}
      />
    </>
  );
};
