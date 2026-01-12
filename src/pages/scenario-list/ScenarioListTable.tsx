import { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Checkbox, Row } from 'antd';
import type { FilterValue } from 'antd/es/table/interface';
import type { SorterResult } from 'antd/lib/table/interface';
import { useNavigate } from 'react-router-dom';
import { type Scenario, scenarioApi } from '@entities/scenario';
import type { Status } from '@entities/scenario/api/code-types';
import { RoutePath } from '@shared/config/router';
import { ScenarioStatusEnum } from '@shared/enums/ScenarioStatus';
import type { IUsePagination } from '@shared/libs';
import {
  createScenarioStatusOptionList,
  SCENARIO_STATUS_LABELS,
} from '@shared/models/selectOptionItem';
import { loadFiltersFromStorage, saveFiltersToStorage } from '@shared/services';
import { ScenarioTableParams } from '@shared/services/LocalStorageService';
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
  sort?: {
    field?: string;
    order?: 'ascend' | 'descend';
  };
}

export const ScenarioListTable = ({
  query,
  pagination,
  onChangePagination,
}: Props) => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>(() =>
    loadFiltersFromStorage(ScenarioTableParams),
  );

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) =>
      Promise.allSettled(ids.map((id) => scenarioApi.remove(id))),
    onSuccess: () => query.refetch(),
  });

  useEffect(() => {
    saveFiltersToStorage(tableParams, ScenarioTableParams);
  }, [tableParams]);

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      order,
      section,
      status,
    }: {
      id: string;
      order: number;
      section: string;
      status: Status;
    }) => scenarioApi.update(id, { order, section, status }),
    onSuccess: () => query.refetch(),
  });

  const statusFilters = useMemo(() => {
    return Object.values(ScenarioStatusEnum).map((status) => ({
      text: SCENARIO_STATUS_LABELS[status] || status,
      value: status,
    }));
  }, []);

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

    if (tableParams.filters?.status) {
      data = data.filter((item) =>
        tableParams.filters!.status!.some((value) => item.status === value),
      );
    }

    if (tableParams.sort?.field && tableParams.sort.order) {
      data.sort((a, b) => {
        const field = tableParams.sort!.field!;
        const order = tableParams.sort!.order!;

        let valueA = a[field];
        let valueB = b[field];

        // Особые случаи сортировки
        if (field === 'createdAt') {
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
        } else if (field === 'status') {
          // Сортировка по статусу на основе порядка в enum или labels
          const statusOrder = Object.values(ScenarioStatusEnum);
          valueA = statusOrder.indexOf(valueA);
          valueB = statusOrder.indexOf(valueB);
        }

        if (valueA < valueB) {
          return order === 'ascend' ? -1 : 1;
        }
        if (valueA > valueB) {
          return order === 'ascend' ? 1 : -1;
        }
        return 0;
      });
    } else {
      // Сортировка по умолчанию: сначала новые (по createdAt)
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // По убыванию (новые сверху)
      });
    }

    return data;
  }, [tableParams.filters, query.data, tableParams.sort]);

  const handleTableChange = (
    _: any,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    setTableParams({
      filters,
      sort:
        singleSorter.field && singleSorter.order
          ? {
              field: singleSorter.field as string,
              order: singleSorter.order,
            }
          : undefined,
    });
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
      status: row.status,
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
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      inputProps: {
        inputType: 'select',
        options: createScenarioStatusOptionList(
          Object.values(ScenarioStatusEnum),
        ),
        style: { width: '100%' },
      },
      render: (status: ScenarioStatusEnum) => (
        <span>{SCENARIO_STATUS_LABELS[status] || status}</span>
      ),
      filters: statusFilters,
      filteredValue: tableParams.filters?.status || null,
    },
    {
      align: 'center',
      title: 'Раздел',
      dataIndex: 'section',
      filters: sectionFilters,
      filteredValue: tableParams.filters?.section || null,
      render: (value: any) => {
        return value ?? 'Не заполнено';
      },
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
      sorter: true,
      sortOrder:
        tableParams.sort?.field === 'createdAt' ? tableParams.sort.order : null,
      defaultSortOrder: 'descend',
    },
  ];

  const columns = baseColumns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.inputType,
        inputProps: col.inputProps,
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
