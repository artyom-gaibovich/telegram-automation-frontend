import type { FilterValue } from 'antd/es/table/interface';
interface TableParams {
  filters?: Record<string, FilterValue | null>;
}

export const TranscriptionTableFilters = 'transcription_table_filters';
export const ScenarioTableParams = 'scenario_table_params';
export const loadFiltersFromStorage = (storageKey: string): TableParams => {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке фильтров из localStorage:', error);
  }
  return {};
};

export const saveFiltersToStorage = (
  filters: TableParams,
  storageKey: string,
) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(filters));
  } catch (error) {
    console.error('Ошибка при сохранении фильтров в localStorage:', error);
  }
};
