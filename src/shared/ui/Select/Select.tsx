import './Select.scss';
import type { JSX } from 'react';
import { Select as AntSelect, type SelectProps as AntSelectProps } from 'antd';
import { bem } from '@shared/libs';
import type { SelectOptionItem } from '@shared/models';

export interface SelectProps<
  ValueType = any,
  OptionType extends SelectOptionItem = SelectOptionItem,
> extends Omit<
    AntSelectProps<ValueType, OptionType>,
    'rootClassName' | 'classNames' | 'value' | 'defaultValue' | 'options'
  > {
  className?: string;
  value?: ValueType | null;
  options?: OptionType[];
}

const b = bem('select');

export function Select<
  ValueType = any,
  OptionType extends SelectOptionItem = SelectOptionItem,
>({
  className,
  value,
  options = [],
  ...props
}: SelectProps<ValueType, OptionType>): JSX.Element {
  return (
    <AntSelect<ValueType, OptionType>
      rootClassName={b(null, [className])}
      notFoundContent="Нет элементов"
      options={options}
      value={value}
      allowClear
      {...props}
    />
  );
}
