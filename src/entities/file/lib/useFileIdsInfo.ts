import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fileApi, type FileStorage } from '@entities/file';

interface Config {
  fileIds: string[] | undefined;
}

/**
 * Хук для получения информации о файлах по их ID
 * @param fileIds Массив идентификаторов файлов
 * @returns Объект вида { [fileId]: FileStorage.ItemInfo } или null для отсутствующих/ошибочных
 */
export const useFileIdsInfo = ({
  fileIds = [],
}: Config): UseQueryResult<Record<string, FileStorage.ItemInfo>> => {
  const validFileIds = fileIds.filter(Boolean);

  return useQuery({
    queryKey: ['fileIdsInfo', validFileIds],
    queryFn: async () => {
      if (validFileIds.length === 0) {
        return {};
      }

      const results = await Promise.all(
        validFileIds.map((id) => fileApi.getInfo(id)),
      );

      return results.reduce(
        (acc, result) => {
          acc[result.id] = result;
          return acc;
        },
        {} as Record<string, FileStorage.ItemInfo>,
      );
    },
    enabled: validFileIds.length > 0,
    // Кэш 5 минут
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
  });
};
