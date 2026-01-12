import type { ReactNode } from 'react';
import { ScenarioStatusEnum, SearchType } from '@shared/enums';

type SelectOptionItemValue = string | number | boolean | null | undefined;

/** Элемент выпадающего списка */
export interface SelectOptionItem<
  T extends SelectOptionItemValue = any,
  L extends ReactNode = ReactNode,
  E = any,
> {
  value: T;
  label?: L;
  disabled?: boolean;
  extraData?: E;
}

const SEARCH_TYPE_LABELS: Record<SearchType, string> = {
  [SearchType.EQUAL]: 'Равно',
  [SearchType.NOT_EQUAL]: 'Не равно',
  [SearchType.CONTAIN]: 'Содержит',
  [SearchType.CONTAIN_ANY]: 'Содержит',
  [SearchType.NOT_CONTAIN]: 'Не содержит',
  [SearchType.EMPTY]: 'Пустой',
  [SearchType.NOT_EMPTY]: 'Не пустой',
  [SearchType.BETWEEN]: 'Между',
  [SearchType.GREATER]: 'Больше',
  [SearchType.GREATER_OR_EQUAL]: 'Больше или равно',
  [SearchType.LESS]: 'Меньше',
  [SearchType.LESS_OR_EQUAL]: 'Меньше или равно',
  [SearchType.IN]: 'В',
};

export const createSearchTypeOptionList = (searchTypes: SearchType[]) =>
  searchTypes.map((searchType) =>
    createSelectOptionItem(
      searchType,
      SEARCH_TYPE_LABELS[searchType] || searchType,
    ),
  );

export const SCENARIO_STATUS_LABELS: Record<ScenarioStatusEnum, string> = {
  [ScenarioStatusEnum.ON_DRAFT]: 'Черновик',
  [ScenarioStatusEnum.ON_WROK]: 'В работе',
  [ScenarioStatusEnum.ON_PUBLISHED]: 'Опубликован',
  [ScenarioStatusEnum.ON_VIDEO_EDITING]: 'Монтаж',
  [ScenarioStatusEnum.ON_VIDEO_SCRIPT]: 'Сценарий',
};

export const createScenarioStatusOptionList = (
  statuses: ScenarioStatusEnum[],
) =>
  statuses.map((status) =>
    createSelectOptionItem(status, SCENARIO_STATUS_LABELS[status] || status),
  );

export function createSelectOptionItem<
  T extends SelectOptionItemValue = string,
>(value: T, label: ReactNode, extraData?: any): SelectOptionItem<T> {
  return { value, label, extraData };
}
