import type { FilterValue } from 'antd/es/table/interface';

interface TableParams {
  filters?: Record<string, FilterValue | null>;
}

export enum LocalStorageKeys {
  TranscriptionTableFilters = 'transcription_table_filters',
  ScenarioTableParams = 'scenario_table_params',
  TranscriptionDetailForm = 'transcription_detail_form',
}

export const loadFiltersFromStorage = <T = TableParams>(
  storageKey: LocalStorageKeys,
): T => {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return parsed as T;
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке фильтров из localStorage:', error);
  }
  return {} as T;
};

export const saveFiltersToStorage = <T = TableParams>(
  filters: T,
  storageKey: LocalStorageKeys,
) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(filters));
  } catch (error) {
    console.error('Ошибка при сохранении фильтров в localStorage:', error);
  }
};
