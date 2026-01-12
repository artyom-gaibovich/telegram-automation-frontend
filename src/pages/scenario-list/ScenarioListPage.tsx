import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Row } from 'antd';
import { scenarioApi } from '@entities/scenario';
import { usePagination } from '@shared/libs';
import { ScenarioListTable } from './ScenarioListTable';

const ScenarioListPage: React.FC = () => {
  const { pagination, onChangePagination } = usePagination();

  const query = useQuery({
    queryKey: ['scenario-list', pagination.page, pagination.size],
    queryFn: () => scenarioApi.getList(),
  });

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 16 }}></Row>

      <ScenarioListTable
        query={query}
        pagination={pagination}
        onChangePagination={onChangePagination}
      />
    </>
  );
};

export default ScenarioListPage;
