import type { ReactNode } from 'react';

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

export function createSelectOptionItem<
  T extends SelectOptionItemValue = string,
>(value: T, label: ReactNode, extraData?: any): SelectOptionItem<T> {
  return { value, label, extraData };
}

