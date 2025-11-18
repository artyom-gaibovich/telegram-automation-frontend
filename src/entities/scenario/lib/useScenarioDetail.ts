import { useMutation, useQuery } from '@tanstack/react-query';
import { scenarioApi } from '../api/methods';

export const useScenarioDetail = (id: string) => {
  const detail = useQuery({
    queryKey: ['scenario-detail', id],
    queryFn: () => scenarioApi.getOne(id),
  });

  const update = useMutation({
    mutationFn: (dto: any) => scenarioApi.update(id, dto),
  });

  return {
    ...detail,
    update: update.mutateAsync,
  };
};
