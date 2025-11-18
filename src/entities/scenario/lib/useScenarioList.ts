import { useMutation, useQuery } from '@tanstack/react-query';
import { scenarioApi } from '../api/methods';

export const useScenarioList = () => {
  const query = useQuery({
    queryKey: ['scenario-list'],
    queryFn: scenarioApi.getList,
  });

  const remove = useMutation({
    mutationFn: scenarioApi.remove,
  });

  return {
    ...query,
    remove: remove.mutateAsync,
  };
};
